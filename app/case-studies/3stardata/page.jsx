import Link from "next/link";

export const metadata = {
  title: "3StarData — Fractional CTO Engagement | CAXiE Technologies Ltd",
  description:
    "How CAXiE Technologies Ltd founder Xavier serves as incoming fractional CTO for 3StarData — a Nigerian VTU/digital services platform — under a retainer + equity model.",
  openGraph: {
    title: "Case Study: 3StarData — Fractional CTO Engagement",
    description:
      "An active fractional CTO engagement: Xavier at 3StarData — retainer + equity model, technology roadmap, and strategic leadership.",
    url: "https://caxietechnologies.com/case-studies/3stardata",
  },
};

export default function ThreeStarDataCaseStudy() {
  return (
    <div className="bg-[#0f0a1a]">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/case-studies/dala-orthopedic"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Case Studies
            </Link>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-300 text-sm">3StarData</span>
          </div>
          <span className="badge-brand inline-block mb-4">
            VTU / Digital Services · Fractional CTO
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl leading-tight">
            3StarData:
            <br />
            <span className="gradient-text">
              Fractional CTO — active engagement
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            This is an ongoing engagement. Details disclosed here are public —
            what we can share about the structure and scope without breaching
            the active COA.{" "}
            <strong className="text-yellow-400">
              [PLACEHOLDER: Xavier to confirm what content is cleared for public
              disclosure.]
            </strong>
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-sm font-medium">
              Active engagement
            </span>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT SUMMARY */}
      <section className="section-sm bg-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Client", value: "3StarData", sub: "Nigeria" },
              {
                label: "Sector",
                value: "VTU / Digital",
                sub: "Services reseller",
              },
              {
                label: "Engagement type",
                value: "Fractional CTO",
                sub: "Retainer + equity",
              },
              { label: "Status", value: "Active", sub: "Ongoing" },
            ].map((s) => (
              <div key={s.label} className="card text-center">
                <div className="font-display font-bold text-xl text-brand-400">
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs mt-1">{s.sub}</div>
                <div className="text-gray-400 text-xs mt-2 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="section">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
          {/* Context */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-600/15 border border-brand-600/30 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-brand-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                Context
              </h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                3StarData is a Nigerian VTU (Virtual Top-Up) and digital
                services reseller platform. As the company scaled, the founders
                recognised they needed enterprise-level technical leadership — a
                CTO who could build the technology roadmap, manage vendors, and
                prevent the compounding technical debt that kills growth-stage
                companies.
              </p>
              <p className="text-gray-400">
                Rather than making a premature full-time CTO hire, 3StarData
                engaged Xavier through CAXiE Technologies Ltd as incoming
                fractional CTO — a retainer + equity model with a defined clause
                for transitioning to full-time CTO as the company reaches target
                scale.
              </p>
            </div>
          </div>

          {/* Engagement structure */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/15 border border-blue-500/30 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                Engagement structure
              </h2>
            </div>
            <div className="bg-brand-600/10 border border-brand-600/20 rounded-2xl p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Engagement model", value: "Retainer + equity" },
                  { label: "Title", value: "Incoming Fractional CTO" },
                  {
                    label: "Transition clause",
                    value: "Full-time CTO at defined milestone",
                  },
                  {
                    label: "Scope",
                    value: "Technology strategy, vendor mgmt, roadmap",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What Xavier is doing */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/15 border border-green-500/30 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                What the engagement covers
              </h2>
            </div>
            <div className="space-y-3">
              {[
                "Technology roadmap development — 12-month plan aligned to 3StarData's growth objectives",
                "Vendor evaluation and management — assessing and managing technology suppliers",
                "Architecture decisions — ensuring build decisions don't create future technical debt",
                "Security posture — establishing a security model appropriate for a payments-adjacent digital platform",
                "[PLACEHOLDER: additional scope items to be confirmed by Xavier]",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <svg
                    className="w-4 h-4 text-green-400 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Why this model matters */}
          <div className="card border border-brand-600/20 bg-brand-600/5 p-8">
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Why the fractional CTO model matters for growth-stage companies
            </h3>
            <div className="space-y-3 text-gray-400 text-sm leading-relaxed">
              <p>
                The typical growth-stage company faces a technology leadership
                gap: they need a CTO-level thinker, but the full-time hire is
                financially premature. The result is that technical decisions
                get made by developers without strategic context, by founders
                without technical depth, or by expensive consultants with no
                skin in the game.
              </p>
              <p>
                The retainer + equity model CAXiE operates under for 3StarData
                is designed to close this gap: Xavier has a financial stake in
                3StarData&apos;s success, which means the incentives are aligned
                — not just commercially, but structurally.
              </p>
              <p>
                <Link
                  href="/services#cto"
                  className="text-brand-400 hover:underline"
                >
                  Learn more about CAXiE&apos;s Fractional CTO service →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">
            Looking for the same kind of technical leadership?
          </h2>
          <p className="text-gray-400">
            If you&apos;re a growth-stage company or SME that needs a senior
            technical voice without a full-time hire, let&apos;s talk about
            whether the fractional CTO model fits your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348165443398?text=Hi%20Xavier%2C%20I%27d%20like%20to%20discuss%20a%20fractional%20CTO%20engagement%20similar%20to%203StarData."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Talk to Xavier
            </a>
            <Link href="/services#cto" className="btn-secondary">
              Fractional CTO details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
