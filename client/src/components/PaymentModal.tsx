import { useCallback, useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tierName: string;
}

const WISE_SETTLEMENT_URL = 'https://wise.com/pay/r/R4VwHll_xibeZgc';

const WIRE_DETAILS = [
  { label: 'Beneficiary', value: 'Global Capital Intelligence LLC' },
  { label: 'Clearing Network', value: 'Wise Business / Settlement Hub' },
  { label: 'IBAN / Account Number', value: '[ENTER_YOUR_WISE_IBAN_OR_ACCOUNT_HERE]' },
  { label: 'BIC / SWIFT / Routing', value: '[ENTER_YOUR_WISE_BIC_OR_ROUTING_HERE]' },
] as const;

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
    </svg>
  );
}

function ChevronIcon({ className, expanded }: { className?: string; expanded: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`${className ?? ''} transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function PaymentModal({ isOpen, onClose, tierName }: PaymentModalProps) {
  const [wireExpanded, setWireExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = useCallback(async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  const openWiseSettlement = useCallback(() => {
    window.open(WISE_SETTLEMENT_URL, '_blank', 'noopener,noreferrer');
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
        aria-label="Close settlement center"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-navy-700 bg-navy-900/95 shadow-panel">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-navy-700 px-6 py-5">
          <div>
            <h2 id="payment-modal-title" className="text-lg font-semibold text-white">
              Institutional Settlement Center
            </h2>
            <p className="mt-1.5 text-sm font-medium text-emerald-glow">{tierName}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Financial clearing operated securely by Global Capital Intelligence LLC.
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

        <div className="scrollbar-thin overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-5">
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-accent">
                Option A · Instant Online Activation
              </p>
              <button
                type="button"
                onClick={openWiseSettlement}
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-accent/40 bg-emerald-accent/15 px-5 py-3.5 text-sm font-semibold text-emerald-glow shadow-emerald transition-all hover:border-emerald-accent/60 hover:bg-emerald-accent/25 hover:shadow-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-accent/50"
              >
                <LockIcon className="h-4 w-4 shrink-0 text-emerald-accent transition-colors group-hover:text-emerald-glow" />
                Pay Securely Online via Wise
              </button>
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-navy-700 to-transparent" />

            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Option B · Corporate Settlement
              </p>
              <div className="overflow-hidden rounded-xl border border-navy-700 bg-navy-950/50">
                <button
                  type="button"
                  onClick={() => setWireExpanded((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-navy-800/40"
                  aria-expanded={wireExpanded}
                >
                  <span className="text-sm font-medium text-white">
                    Corporate Bank Wire / Purchase Order (PO)
                  </span>
                  <ChevronIcon className="h-5 w-5 shrink-0 text-slate-500" expanded={wireExpanded} />
                </button>

                {wireExpanded && (
                  <div className="border-t border-navy-700 px-4 py-4">
                    <div className="flex flex-col gap-3">
                      {WIRE_DETAILS.map(({ label, value }) => (
                        <div
                          key={label}
                          className="group rounded-lg border border-navy-700/80 bg-navy-900/60 p-3 transition-colors hover:border-emerald-accent/20"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                {label}
                              </p>
                              <p className="mt-1 break-all font-mono text-xs leading-relaxed text-slate-300">
                                {value}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(label, value)}
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-navy-700 bg-navy-950/60 text-slate-500 transition-colors hover:border-emerald-accent/30 hover:text-emerald-glow"
                              aria-label={`Copy ${label}`}
                              title={copiedField === label ? 'Copied' : `Copy ${label}`}
                            >
                              {copiedField === label ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="h-3.5 w-3.5 text-emerald-glow"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <CopyIcon className="h-3.5 w-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="shrink-0 border-t border-navy-700 px-6 py-4">
          <p className="text-xs leading-relaxed text-slate-500">
            For customized pro-forma invoices, vendor registration packets, or official purchase order
            coordination, please query our billing office directly at{' '}
            <a
              href="mailto:contact@waqfledger.tech"
              className="font-medium text-slate-400 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-emerald-glow hover:decoration-emerald-accent/40"
            >
              contact@waqfledger.tech
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
