export type LegalContentType = 'terms' | 'privacy' | 'dpa';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: LegalContentType;
}

const LEGAL_CONTENT: Record<
  LegalContentType,
  { title: string; lastUpdated: string; sections: { heading: string; body: string }[] }
> = {
  terms: {
    title: 'Terms of Consortium',
    lastUpdated: '28 June 2026',
    sections: [
      {
        heading: '1. Governing Framework',
        body:
          'The Open-Access Research Consortium ("Consortium") operates under the French Law of 1 July 1901 relating to the contract of association (association loi 1901). Membership constitutes a contractual adhesion to these Terms, the Privacy & GDPR Policy, and—where applicable—the Data Processing Agreement. The Consortium is a non-profit scientific and regulatory research collective whose purpose is to standardize AI literacy assessment, peer benchmarking, and cryptographic compliance attestation across institutional partners in the European Union and affiliated jurisdictions.',
      },
      {
        heading: '2. Membership Scope & Entitlements',
        body:
          'Upon acceptance into the Consortium, the Member institution receives non-exclusive access to: (a) global peer-benchmarking metrics aggregated from anonymized, hashed compliance receipts; (b) AI literacy standardization tools aligned with EU AI Act Article 4 human oversight requirements and Article 11 technical documentation obligations; and (c) tokenless cryptographic anchoring layers that produce deterministic SHA-256 hash proofs without blockchain token infrastructure. Access tiers, contribution schedules, and volume quotas are defined in the institutional onboarding schedule and may vary by membership category.',
      },
      {
        heading: '3. Obligations of Members',
        body:
          'Members agree to: use Consortium tooling exclusively for lawful institutional, research, or regulatory purposes; refrain from re-identifying anonymized benchmark datasets; maintain appropriate internal governance for human oversight compliance; and ensure that all API integrations originate from authorized domains registered during onboarding. Members shall not attempt to reverse-engineer, scrape, or exfiltrate raw ledger payloads beyond their own institutional receipt namespace.',
      },
      {
        heading: '4. Intellectual Property & Open Research',
        body:
          'Benchmarking frameworks, literacy rubrics, and reference architecture documentation published under the Consortium open-access charter remain the collective intellectual property of the association, licensed to Members under a perpetual, royalty-free research and institutional use license. Individual compliance receipts and hash proofs remain the property of the originating Member institution.',
      },
      {
        heading: '5. Limitation of Liability',
        body:
          'The Consortium provides infrastructure on an "as-is" basis for research and compliance logging purposes. It does not constitute legal advice, regulatory certification, or a substitute for formal conformity assessment under the EU AI Act. Members retain sole responsibility for their regulatory obligations and for the accuracy of data submitted to anchoring endpoints.',
      },
      {
        heading: '6. Termination & Suspension',
        body:
          'Either party may terminate membership with thirty (30) days written notice. The Consortium may suspend access immediately upon material breach of these Terms, fraudulent API usage, or attempts to compromise the zero-knowledge architecture. Upon termination, previously anchored hash proofs remain immutably recorded; no raw payload data is retained on Consortium servers.',
      },
      {
        heading: '7. Governing Law & Dispute Resolution',
        body:
          'These Terms are governed by French law. Disputes arising from Consortium membership shall first be submitted to good-faith mediation before the association\'s executive board. Failing resolution, competent courts in Paris, France shall have exclusive jurisdiction, without prejudice to mandatory consumer or institutional protections under applicable EU law.',
      },
    ],
  },
  privacy: {
    title: 'Privacy & GDPR Policy',
    lastUpdated: '28 June 2026',
    sections: [
      {
        heading: '1. Zero-Knowledge Architecture',
        body:
          'WaqfLedger.tech and the Open-Access Research Consortium implement a zero-knowledge compliance logging architecture by design. The platform is engineered so that the serverless ledger runtime never receives, processes, stores, or transmits Personally Identifiable Information (PII), raw model parameters, assessment responses, or any other sensitive payload in cleartext form. This architectural constraint is not a policy preference—it is a technical invariant enforced at the client-side hashing boundary.',
      },
      {
        heading: '2. Client-Side SHA-256 Hashing',
        body:
          'All sensitive payload data is strictly hashed client-side via SHA-256 before transit. The hashing operation occurs in the Member\'s browser or authorized integration environment prior to any network request. Only the resulting deterministic hash digest, associated metadata (track type, organization identifier, timestamp), and compliance status flag traverse the API boundary. The original payload cannot be reconstructed from the hash proof stored on the ledger.',
      },
      {
        heading: '3. Data Controller & Processor Roles',
        body:
          'For institutional Members embedding Consortium receipts into LMS, HRIS, or GRC pipelines, the Member institution acts as the Data Controller under GDPR Article 4(7). WaqfLedger.tech acts as a Data Processor limited to receiving and anchoring pre-hashed metadata. Because no PII reaches the processor layer, the standard data subject access, rectification, and erasure workflows apply exclusively to data held by the Controller within its own systems—not within the Consortium ledger.',
      },
      {
        heading: '4. Lawful Basis for Processing',
        body:
          'Processing of hash metadata and benchmark aggregates is conducted on the lawful bases of: (a) legitimate interests (Article 6(1)(f)) in maintaining auditable compliance trails for AI literacy and regulatory oversight; and (b) contractual necessity (Article 6(1)(b)) where institutional membership agreements require cryptographic attestation. No special category data under Article 9 is processed by the ledger runtime.',
      },
      {
        heading: '5. Data Minimization & Retention',
        body:
          'The ledger retains only: SHA-256 hash proofs, ISO 8601 timestamps, track classification identifiers, anonymized organization namespace tags, and compliance status markers. Retention periods align with institutional audit requirements (default: seven years for GRC-grade trails) unless a shorter period is contractually specified in the DPA. No raw assessment content, employee records, or model configuration snapshots are ever persisted.',
      },
      {
        heading: '6. International Transfers',
        body:
          'Hash metadata may be replicated across geographically distributed serverless nodes for availability and integrity verification. All transfers occur under Standard Contractual Clauses (SCCs) where applicable, with supplementary technical measures including end-to-end TLS 1.3 encryption and client-side pre-hashing that eliminates transfer of personal data as defined under GDPR.',
      },
      {
        heading: '7. Data Subject Rights & Immutability Invariant',
        body:
          'Because the Consortium ledger does not process or contain PII, standard data subject rights requests (access, rectification, portability) must be directed to the Member institution acting as Data Controller. In accordance with GDPR Article 17(3)(b) and (d), the right to erasure (\'right to be forgotten\') does not apply to the immutably anchored cryptographic hash proofs, as processing is strictly necessary for compliance with legal obligations (EU AI Act audit trails) and for scientific or statistical research purposes. The Consortium will assist Controllers in verifying hash proof integrity upon written verification but cannot alter append-only ledger states.',
      },
      {
        heading: '8. Contact & DPO',
        body:
          'Privacy inquiries may be directed to privacy@waqfledger.tech. Institutional partners requiring a formal Data Processing Agreement should reference the DPA module accessible from this footer or contact dpa@waqfledger.tech.',
      },
    ],
  },
  dpa: {
    title: 'Data Processing Agreement (DPA)',
    lastUpdated: '28 June 2026',
    sections: [
      {
        heading: '1. Scope & Purpose',
        body:
          'This Data Processing Agreement ("DPA") governs the processing of hash metadata by WaqfLedger.tech ("Processor") on behalf of institutional Consortium Members ("Controller") who embed compliance receipts into external Learning Management Systems (LMS), Human Resource Information Systems (HRIS), Governance, Risk & Compliance (GRC) platforms, or equivalent enterprise pipelines. This DPA supplements the Terms of Consortium and Privacy & GDPR Policy and prevails on matters of data processing obligations.',
      },
      {
        heading: '2. Subject Matter & Duration',
        body:
          'The Processor anchors pre-hashed compliance metadata submitted by the Controller via authenticated API endpoints for the duration of the institutional membership agreement. Processing is limited exclusively to: receipt validation, SHA-256 hash proof generation, timestamp attestation, status classification, and anonymized aggregate benchmarking contribution.',
      },
      {
        heading: '3. Nature & Purpose of Processing',
        body:
          'Processing activities include: cryptographic verification of client-side hashes; append-only ledger recording; deterministic receipt generation; and federated benchmark aggregation. The Processor shall not perform profiling, automated decision-making affecting data subjects, or any transformation that could reconstitute original payload data from hash proofs.',
      },
      {
        heading: '4. Technical Security Measures (TOMs)',
        body:
          'The Processor implements the following technical measures: TLS 1.3 encryption for all API transit; HMAC-SHA256 request authentication; rate limiting and origin domain validation; append-only immutable ledger storage; automated integrity checksums on all anchored blocks; serverless isolation with per-tenant API key scoping; and continuous vulnerability monitoring. Client-side SHA-256 pre-hashing ensures sensitive data never enters the processing environment.',
      },
      {
        heading: '5. Organizational Security Measures',
        body:
          'Organizational measures include: role-based access control for administrative operations; annual third-party security assessments; incident response procedures with 72-hour breach notification to Controllers; employee confidentiality agreements; sub-processor due diligence; and documented change management for all ledger runtime deployments. Access to production systems requires multi-factor authentication and is logged for audit.',
      },
      {
        heading: '6. Sub-Processors',
        body:
          'The Controller authorizes the Processor to engage sub-processors for cloud hosting, CDN delivery, and monitoring services. An current sub-processor list is available upon request. The Processor shall notify Controllers of sub-processor changes with thirty (30) days advance notice and an opportunity to object on reasonable grounds related to data protection.',
      },
      {
        heading: '7. LMS / HRIS / GRC Integration Requirements',
        body:
          'Controllers embedding receipts into external pipelines must: (a) maintain client-side hashing within their integration layer before API submission; (b) register authorized origin domains during onboarding; (c) scope API keys to the minimum necessary track types; (d) implement retry logic that does not expose raw payload data in error logs; and (e) document the data flow mapping in their internal Records of Processing Activities (RoPA) under GDPR Article 30.',
      },
      {
        heading: '8. Audit Rights & Compliance Assistance',
        body:
          'Controllers may request annual audit summaries, penetration test executive reports, and hash proof verification tooling. On-site audits may be conducted once per calendar year upon thirty (30) days written notice, subject to confidentiality and operational safety constraints. The Processor shall assist Controllers in responding to supervisory authority inquiries related to anchored metadata.',
      },
      {
        heading: '9. Data Return & Deletion',
        body:
          'Upon termination of the membership agreement, the Processor shall provide the Controller with a complete export of hash receipts within its namespace. Immutable ledger entries cannot be deleted due to audit integrity requirements; however, API access and active processing cease immediately. Controllers may request namespace archival with read-only access for the legally mandated retention period.',
      },
      {
        heading: '10. Liability & Indemnification',
        body:
          'Each party\'s liability under this DPA is capped at the total membership fees paid in the twelve (12) months preceding the claim, except for breaches arising from willful misconduct or gross negligence. The Processor indemnifies the Controller against claims arising from Processor-side security failures that result in unauthorized access to non-hashed data—an event architecturally prevented by the zero-knowledge design.',
      },
    ],
  },
};

export default function LegalModal({ isOpen, onClose, contentType }: LegalModalProps) {
  if (!isOpen) return null;

  const content = LEGAL_CONTENT[contentType];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
        aria-label="Close legal document"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-navy-700 bg-navy-900/95 shadow-panel">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-navy-700 px-6 py-5">
          <div>
            <h2 id="legal-modal-title" className="text-lg font-semibold text-white">
              {content.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Open-Access Research Consortium · Last updated {content.lastUpdated}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-navy-700 bg-navy-950/60 text-slate-400 transition-colors hover:border-emerald-accent/30 hover:bg-navy-800 hover:text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="scrollbar-thin overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-6">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-sm font-semibold text-emerald-glow">{section.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{section.body}</p>
              </section>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-navy-700 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-emerald-accent/30 bg-emerald-accent/10 px-4 py-2.5 text-sm font-medium text-emerald-glow transition-colors hover:border-emerald-accent/50 hover:bg-emerald-accent/20"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
