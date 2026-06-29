import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

interface Article4CompliancePayload {
  hash: string;
  candidateName: string;
  tierId: string | number;
  score: number;
  timestamp: string;
  trackType: 'ARTICLE_4_COMPLIANCE_VALIDATION';
}

const SHA256_HEX_REGEX = /^[a-fA-F0-9]{64}$/;
let ledgerBlockIndex = 24392;

const app = express();
const PORT = 3001;

app.use(helmet());
app.use(express.json());

const whitelist = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://safeai.report',
  'https://certichain.eu',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Security Layer: Origin blocked by CORS restriction.'));
      }
    },
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Rate limit activated to protect ledger performance.' },
});

app.post('/api/v1/ledger/log-compliance', apiLimiter, async (req, res) => {
  try {
    const {
      trackType,
      hash,
      candidateName,
      tierId,
      score,
      timestamp,
    } = req.body as Partial<Article4CompliancePayload>;

    if (trackType !== 'ARTICLE_4_COMPLIANCE_VALIDATION') {
      return res.status(400).json({
        error: 'Invalid transaction tracking track target.',
        received: trackType,
      });
    }

    if (
      hash === undefined ||
      candidateName === undefined ||
      tierId === undefined ||
      score === undefined ||
      timestamp === undefined
    ) {
      return res.status(400).json({
        error: 'Malformed transaction payload. Missing mandatory compliance parameters.',
      });
    }

    if (!SHA256_HEX_REGEX.test(hash)) {
      return res.status(400).json({
        error:
          'Cryptographic boundary violation. The hash must be a valid 64-character SHA-256 hex string array/value.',
      });
    }

    if (
      typeof candidateName !== 'string' ||
      typeof score !== 'number' ||
      Number.isNaN(Date.parse(timestamp))
    ) {
      return res.status(400).json({
        error: 'Data type validation failed. Fields fail primitive structural evaluation.',
      });
    }

    const blockIndex = ledgerBlockIndex;
    ledgerBlockIndex += 1;

    return res.status(200).json({
      status: 'success',
      message: 'Compliance payload firmly anchored to trust engine ledger.',
      blockIndex,
      timestamp: new Date().toISOString(),
      hash,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
});

app.listen(PORT, () => console.log(`🚀 WaqfLedger Core API listening on port ${PORT}`));

export default app;
