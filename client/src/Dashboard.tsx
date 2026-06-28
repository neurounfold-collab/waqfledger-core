import { useMemo, useState } from 'react';
import { type LegalContentType } from './components/LegalModal';
import PaymentModal from './components/PaymentModal';

interface DashboardProps {
  onOpenLegalModal: (type: LegalContentType) => void;
}

const CURL_INTEGRATION_SNIPPET = `curl -X POST https://api.waqfledger.tech/api/v1/ledger/log-compliance \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_CONSORTIUM_API_KEY" \\
  -H "Origin: https://your-authorized-domain.com" \\
  -d '{
    "trackType": "ARTICLE_4",
    "targetOrganization": "Institutional Partner EU",
    "payloadData": {
      "assessmentId": "SCENARIO-28",
      "completionDate": "2026-06-28",
      "oversightScore": 97.2
    }
  }'`;

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  icon: string;
}

interface LogEntry {
  id: string;
  organization: string;
  detail: string;
  hash: string;
  timestamp: string;
  status: 'Compliant' | 'Verified' | 'Anchored';
}

interface TrackColumnProps {
  title: string;
  subtitle: string;
  accentClass: string;
  entries: LogEntry[];
}

const SUMMARY_METRICS: MetricCardProps[] = [
  {
    label: 'Active Institutional Certifications',
    value: '847',
    delta: '+12 this week',
    icon: '🏛️',
  },
  {
    label: 'Combined Global Trust Score',
    value: '98.7%',
    delta: '+0.4% QoQ',
    icon: '🛡️',
  },
  {
    label: 'Total Ledger Blocks Anchored',
    value: '24,391',
    delta: '+186 today',
    icon: '⛓️',
  },
  {
    label: 'Verified Academic Credentials',
    value: '3,204',
    delta: '+28 from CLE pipeline',
    icon: '🎓',
  },
];

const HUMAN_TRACK_ENTRIES: LogEntry[] = [
  {
    id: 'H-4821',
    organization: 'Cisco EU Compliance Hub',
    detail: '30-Scenario AI Literacy Assessment — Module 14 completed',
    hash: 'a7f3…9c2e',
    timestamp: '2026-06-15 09:42 UTC',
    status: 'Compliant',
  },
  {
    id: 'H-4820',
    organization: 'BNP Paribas RegTech Division',
    detail: 'Human oversight training refresh — Article 4 literacy review',
    hash: 'b2e8…4d1a',
    timestamp: '2026-06-15 08:17 UTC',
    status: 'Compliant',
  },
  {
    id: 'H-4819',
    organization: 'Telefónica AI Governance Office',
    detail: 'Supervisory competency attestation — Q2 2026 cycle',
    hash: 'c9d1…7f88',
    timestamp: '2026-06-14 16:55 UTC',
    status: 'Compliant',
  },
  {
    id: 'H-4818',
    organization: 'safeAI.report Pilot Cohort',
    detail: 'TOEFL-of-AI-Literacy benchmark — 28/30 scenarios passed',
    hash: 'd4a2…1b63',
    timestamp: '2026-06-14 14:30 UTC',
    status: 'Compliant',
  },
];

const TECHNICAL_TRACK_ENTRIES: LogEntry[] = [
  {
    id: 'T-9104',
    organization: 'Model Risk — FinServ Tier-1',
    detail: 'Parameter evaluation: temperature=0.2, max_tokens=4096 validated',
    hash: 'e1f7…8a44',
    timestamp: '2026-06-15 10:01 UTC',
    status: 'Anchored',
  },
  {
    id: 'T-9103',
    organization: 'EU AI Act Article 11 Audit',
    detail: 'Model validation hash — GPT-4o deployment snapshot',
    hash: 'f8c3…2e91',
    timestamp: '2026-06-15 07:48 UTC',
    status: 'Anchored',
  },
  {
    id: 'T-9102',
    organization: 'CertiChain Infrastructure',
    detail: 'Technical documentation provenance — v2.4.1 attestation',
    hash: '0a5b…6d77',
    timestamp: '2026-06-14 22:12 UTC',
    status: 'Anchored',
  },
  {
    id: 'T-9101',
    organization: 'WaqfLedger Core Node',
    detail: 'Zero-knowledge metadata signature — deterministic SHA-256 proof',
    hash: '1b6e…9f03',
    timestamp: '2026-06-14 19:00 UTC',
    status: 'Anchored',
  },
];

const ACADEMIC_TRACK_ENTRIES: LogEntry[] = [
  {
    id: 'A-3307',
    organization: 'Al Akhawayn University',
    detail: 'MSc Data Science — degree verified via CLE micro-credential chain',
    hash: '2c7d…4a18',
    timestamp: '2026-06-15 11:22 UTC',
    status: 'Verified',
  },
  {
    id: 'A-3306',
    organization: 'CLE — Center for Language Excellence',
    detail: 'AI Ethics Micro-Credential — 48 ECTS equivalent attestation',
    hash: '3d8f…5b29',
    timestamp: '2026-06-15 06:15 UTC',
    status: 'Verified',
  },
  {
    id: 'A-3305',
    organization: 'Al Akhawayn University',
    detail: 'RegTech Professional Certificate — provenance anchored',
    hash: '4e9a…6c40',
    timestamp: '2026-06-14 13:44 UTC',
    status: 'Verified',
  },
  {
    id: 'A-3304',
    organization: 'CLE / safeAI.report Bridge',
    detail: 'Trilingual competency badge — EN/FR/ES literacy credential',
    hash: '5f0b…7d51',
    timestamp: '2026-06-14 10:08 UTC',
    status: 'Verified',
  },
];

interface ConsortiumTier {
  category: string;
  head: string;
  subhead: string;
  price: string;
  cta: string;
}

const CONSORTIUM_TIERS: ConsortiumTier[] = [
  {
    category: 'Academic & Research Pilot',
    head: 'Sponsored Open Access',
    subhead:
      'For university pipelines and research units mapping foundational literacy frameworks.',
    price: '€0 / Free Access',
    cta: 'Request Pilot Enrollment',
  },
  {
    category: 'Institutional Consortium Member',
    head: 'Core Benchmarking Membership',
    subhead:
      'For mid-tier institutional bodies and educational centers executing active peer-benchmarking streams.',
    price: '€499 / month',
    cta: 'Activate & Settle Online',
  },
  {
    category: 'Sovereign Governance',
    head: 'Global Compliance Partner',
    subhead:
      'For international regulatory bodies, state entities, and enterprise-scale audit networks requiring custom volume quotas.',
    price: 'Custom Contribution',
    cta: 'Query Custom Quota',
  },
];

const ACADEMIC_PILOT_MAILTO =
  'mailto:contact@waqfledger.tech?subject=Academic%20Pilot%20Access%20Request';

const SOVEREIGN_GOVERNANCE_MAILTO =
  'mailto:contact@waqfledger.tech?subject=Sovereign%20Governance%20Custom%20Quota%20Query%20%E2%80%94%20Global%20Capital%20Intelligence%20LLC';

function MetricCard({ label, value, delta, icon }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-navy-700 bg-navy-900/80 p-5 shadow-panel transition-all hover:border-emerald-accent/40 hover:shadow-emerald">
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-emerald-accent/5 transition-transform group-hover:scale-110" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
          <p className="mt-1 text-sm font-medium text-emerald-glow">{delta}</p>
        </div>
        <span className="text-2xl opacity-80" aria-hidden="true">
          {icon}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LogEntry['status'] }) {
  const styles = {
    Compliant: 'bg-emerald-accent/15 text-emerald-glow border-emerald-accent/30',
    Verified: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    Anchored: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function TrackColumn({ title, subtitle, accentClass, entries }: TrackColumnProps) {
  return (
    <div className="flex flex-col rounded-xl border border-navy-700 bg-navy-900/60 shadow-panel">
      <div className={`border-b border-navy-700 px-5 py-4 ${accentClass}`}>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
      </div>
      <div className="scrollbar-thin flex max-h-[420px] flex-col gap-3 overflow-y-auto p-4">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-lg border border-navy-700/80 bg-navy-950/50 p-4 transition-colors hover:border-emerald-accent/25"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-emerald-accent">{entry.id}</span>
              <StatusBadge status={entry.status} />
            </div>
            <p className="text-sm font-medium text-slate-200">{entry.organization}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{entry.detail}</p>
            <div className="mt-3 flex items-center justify-between border-t border-navy-700/60 pt-2">
              <span className="font-mono text-[10px] text-slate-500">#{entry.hash}</span>
              <time className="text-[10px] text-slate-500">{entry.timestamp}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onOpenLegalModal }: DashboardProps) {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const lastSync = useMemo(
    () => new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
    [],
  );

  const handleTierAction = (category: string) => {
    switch (category) {
      case 'Academic & Research Pilot':
        window.location.href = ACADEMIC_PILOT_MAILTO;
        break;
      case 'Institutional Consortium Member':
        setSelectedTier('Institutional Consortium Member');
        setIsPayOpen(true);
        break;
      case 'Sovereign Governance':
        window.location.href = SOVEREIGN_GOVERNANCE_MAILTO;
        break;
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      {/* Header */}
      <header className="border-b border-navy-700/80 bg-navy-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-accent/30 bg-emerald-accent/10">
              <span className="text-lg font-bold text-emerald-accent">W</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                WaqfLedger<span className="text-emerald-accent">.tech</span>
              </h1>
              <p className="text-xs text-slate-400">
                Tokenless Zero-Knowledge Sovereign Trust Engine
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-accent" />
            </span>
            <span className="text-xs font-medium text-emerald-glow">Ledger Sync Active</span>
            <span className="text-xs text-slate-500">|</span>
            <span className="font-mono text-[11px] text-slate-400">{lastSync}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary Metrics */}
        <section aria-label="Trust metrics summary">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-accent/50 to-transparent" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-accent">
              Sovereign Trust Overview
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-emerald-accent/50 to-transparent" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {SUMMARY_METRICS.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>

        {/* 3-Column Visual Log */}
        <section className="mt-10" aria-label="Compliance visual log">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Visual Compliance Log</h2>
            <p className="mt-1 text-sm text-slate-400">
              Live mock ledger streams across Human, Technical, and Academic trust tracks
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <TrackColumn
              title="Human Track"
              subtitle="Article 4 Compliance — Literacy reviews & training dates"
              accentClass="border-l-4 border-l-emerald-accent"
              entries={HUMAN_TRACK_ENTRIES}
            />
            <TrackColumn
              title="Technical Track"
              subtitle="Article 11 Compliance — Parameter evaluations & model validation hashes"
              accentClass="border-l-4 border-l-amber-400"
              entries={TECHNICAL_TRACK_ENTRIES}
            />
            <TrackColumn
              title="Academic Track"
              subtitle="Credential Provenance — Al Akhawayn University / CLE verified credentials"
              accentClass="border-l-4 border-l-blue-400"
              entries={ACADEMIC_TRACK_ENTRIES}
            />
          </div>
        </section>

        {/* Footer — Ecosystem Integration Gateway */}
        <footer className="mt-12 rounded-2xl border border-navy-700 bg-navy-900/40 p-6 shadow-panel lg:p-8">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Ecosystem Integration Gateway</h2>
              <p className="mt-1 text-sm text-slate-400">
                Low-overhead API surface for institutional viral scale across the safeAI.report
                ecosystem
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-emerald-accent/20 bg-emerald-accent/5 px-3 py-2">
              <span className="font-mono text-xs text-emerald-glow">POST /api/v1/ledger/log-compliance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* curl snippet */}
            <div className="rounded-xl border border-navy-700 bg-navy-950/80">
              <div className="flex items-center justify-between border-b border-navy-700 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Integration Reference
                </span>
                <span className="rounded bg-navy-800 px-2 py-0.5 font-mono text-[10px] text-emerald-accent">
                  markdown / curl
                </span>
              </div>
              <pre className="scrollbar-thin overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
                <code>{CURL_INTEGRATION_SNIPPET}</code>
              </pre>
              <div className="border-t border-navy-700 px-4 py-3">
                <p className="text-xs leading-relaxed text-slate-500">
                  Response returns a deterministic receipt with{' '}
                  <code className="text-emerald-glow">hashProof</code>,{' '}
                  <code className="text-emerald-glow">timestamp</code>, and{' '}
                  <code className="text-emerald-glow">status: Compliant</code> — ready for GRC
                  audit trails without token infrastructure.
                </p>
              </div>
            </div>

            {/* Open-Access Consortium tiers */}
            <div className="flex flex-col gap-4">
              {CONSORTIUM_TIERS.map((tier) => (
                <div
                  key={tier.category}
                  className="rounded-xl border border-navy-700 bg-navy-950/50 p-4 transition-colors hover:border-emerald-accent/20"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {tier.category}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-emerald-glow">{tier.head}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{tier.subhead}</p>
                  <p className="mt-3 text-sm font-bold tracking-tight text-white">{tier.price}</p>
                  <button
                    type="button"
                    onClick={() => handleTierAction(tier.category)}
                    className={`mt-4 w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                      tier.category === 'Institutional Consortium Member'
                        ? 'border border-emerald-accent/40 bg-emerald-accent/15 text-emerald-glow hover:border-emerald-accent/60 hover:bg-emerald-accent/25'
                        : 'border border-navy-700 bg-navy-900/60 text-slate-300 hover:border-emerald-accent/30 hover:bg-navy-800 hover:text-white'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-navy-700/60 pt-6">
            <p className="text-center text-xs text-slate-500 sm:text-left">
              WaqfLedger.tech • Cryptographic compliance logging and peer benchmarking for EU AI
              Act Article 4 &amp; 11.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:justify-start">
                <span>safeAI.report</span>
                <span aria-hidden="true">·</span>
                <span>certichain.eu</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-accent/80">Zero-Knowledge · Tokenless · Sovereign</span>
              </div>
              <nav
                className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-end"
                aria-label="Consortium legal and compliance"
              >
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="text-[11px] text-slate-500/50 transition-colors hover:text-slate-400/80"
                >
                  Terms of Consortium
                </button>
                <span aria-hidden="true" className="text-[11px] text-slate-600/40">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('privacy')}
                  className="text-[11px] text-slate-500/50 transition-colors hover:text-slate-400/80"
                >
                  Privacy &amp; GDPR Policy (Zero-Knowledge Client-Side Hashing)
                </button>
                <span aria-hidden="true" className="text-[11px] text-slate-600/40">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('dpa')}
                  className="text-[11px] text-slate-500/50 transition-colors hover:text-slate-400/80"
                >
                  Data Processing Agreement (DPA)
                </button>
              </nav>
            </div>
          </div>
        </footer>
      </main>
    </div>
    <PaymentModal
      isOpen={isPayOpen}
      onClose={() => setIsPayOpen(false)}
      tierName={selectedTier}
    />
    </>
  );
}
