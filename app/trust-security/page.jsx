import Link from 'next/link';

export const metadata = {
  title: 'Trust & Security — How CAXiE Handles Client Data & Secure Delivery',
  description:
    'CAXiE Technologies\'s security posture, data handling practices, secure development methodology, and compliance stance. For technical and legal reviewers on client buying committees.',
  openGraph: {
    title: 'CAXiE Technologies — Trust & Security Statement',
    description: 'Data handling, secure development practices, and compliance information for prospective clients evaluating CAXiE Technologies.',
    url: 'https://caxietechnologies.com/trust-security',
  },
};

export default function TrustSecurityPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-green inline-block mb-4">Trust & Security</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl leading-tight">
            Our security posture.<br />
            <span className="text-green-400">Documented, not assumed.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            This page is written for the technical leads, legal teams, and procurement officers on client buying committees who need to evaluate CAXiE Technologies as a vendor before trusting us with their systems.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">

          {/* Principle */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8">
            <h2 className="font-display font-bold text-2xl text-white mb-4">Cybersecurity-first: what it actually means</h2>
            <div className="space-y-3 text-gray-300 leading-relaxed">
              <p>
                Every engagement CAXiE takes on begins with a threat model — including our own infrastructure and this website. &ldquo;Cybersecurity-first&rdquo; is not a marketing claim; it is the sequence in which we make technical decisions.
              </p>
              <p className="text-gray-400">
                We do not bolt security on after a system is designed. We design systems around the assumption that they will be attacked, and we build in the controls before the first line of application code is written.
              </p>
            </div>
          </div>

          {/* Data handling */}
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-6">How we handle client data</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Data minimisation',
                  desc: 'We collect only the data required to deliver your engagement. We do not aggregate, resell, or retain client data beyond the scope and duration of the engagement.',
                },
                {
                  title: 'Data storage',
                  desc: 'Client project data is stored in encrypted-at-rest repositories. Access is limited to the engagement team on a need-to-know basis. We use Supabase (PostgreSQL with row-level security) for dynamic data where applicable.',
                },
                {
                  title: 'Confidentiality',
                  desc: 'All client engagements are covered by a standard NDA/confidentiality clause. We will not disclose engagement details, system architecture, or client-specific technical information without explicit written permission.',
                },
                {
                  title: 'Communication security',
                  desc: 'Client communication is conducted over encrypted channels (WhatsApp end-to-end encryption for day-to-day, or client-preferred secure communication tools for enterprise engagements).',
                },
                {
                  title: 'Third-party access',
                  desc: 'We do not share client data with third parties except where explicitly required by the engagement (e.g., cloud provider infrastructure). When third-party tools are used, we disclose them in the project proposal.',
                },
              ].map((item) => (
                <div key={item.title} className="card">
                  <h3 className="font-display font-semibold text-green-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secure dev practices */}
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-6">Secure development practices</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Dependency auditing', desc: 'Every project ships with a clean npm audit or equivalent. We do not launch on known CVEs. (This site itself was migrated specifically to eliminate the CRA-era unpatched dependency stack.)' },
                { title: 'Input validation', desc: 'All user inputs are validated server-side. We treat client-side validation as a UX feature, not a security control.' },
                { title: 'Authentication', desc: 'We implement proper authentication flows — no hardcoded credentials, no insecure storage of secrets, no cleartext transmission of sensitive data.' },
                { title: 'Environment separation', desc: 'Production, staging, and development environments are kept strictly separated. No production credentials in development environments.' },
                { title: 'Security headers', desc: 'Every web system we deploy ships with appropriate security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy configured correctly.' },
                { title: 'HTTPS everywhere', desc: 'No client system we deploy operates over unencrypted HTTP. TLS certificates are managed and auto-renewed.' },
                { title: 'Access control', desc: 'Least-privilege principle applied to all system access. Row-level security implemented in database layers where applicable.' },
                { title: 'Incident response', desc: 'For retainer clients, we maintain a documented incident response plan and a defined escalation path for security events.' },
              ].map((p) => (
                <div key={p.title} className="card">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1">{p.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* This website */}
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-6">This website&apos;s security posture</h2>
            <p className="text-gray-400 mb-6">
              A cybersecurity vendor&apos;s own website is the most direct evidence of how they treat security in practice. Here is the documented posture of caxietechnologies.com:
            </p>
            <div className="space-y-3">
              {[
                { label: 'Framework', value: 'Next.js App Router — server-side rendered, no client-only JS shell' },
                { label: 'Dependency audit', value: 'Clean (react-scripts removed, transitive libvips CVEs in sharp documented and tracked)' },
                { label: 'Security headers', value: 'X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy — all configured' },
                { label: 'HTTPS', value: 'Enforced — no HTTP fallback' },
                { label: 'Forms', value: 'Server-side validation — inputs sanitised before processing' },
                { label: 'Third-party scripts', value: 'Minimal — no ad trackers, no third-party analytics by default' },
                { label: 'Accessibility', value: 'WCAG 2.1 AA baseline — semantic HTML, contrast compliant, keyboard navigable' },
              ].map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-3 border-b border-white/5 last:border-0">
                  <span className="text-gray-500 text-sm w-48 flex-shrink-0">{row.label}</span>
                  <span className="text-gray-200 text-sm">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-4">Compliance context</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              CAXiE Technologies operates under Nigerian law and the applicable international standards for the sectors we serve. For healthcare engagements, we align to Nigerian Data Protection Regulation (NDPR) requirements and apply HIPAA-equivalent data handling practices as a baseline. For financial services adjacent clients (including VTU/digital services), we apply PCI-DSS awareness in system design even where formal certification is not required.
            </p>
            <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-5">
              <p className="text-gray-300 text-sm">
                If you have specific compliance requirements (ISO 27001, SOC 2, NDPR, GDPR, etc.) for a vendor engagement, please include them in your project brief. We will confirm our alignment in the proposal.
              </p>
            </div>
          </div>

          {/* Contact for review */}
          <div className="card border border-green-500/20 bg-green-500/5 p-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">Technical or legal review</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              If you are a technical lead or legal officer conducting vendor evaluation, we welcome direct questions. We are prepared to provide additional documentation, answer technical questionnaires, or participate in vendor security assessments for enterprise engagements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:contact@caxietechnologies.com?subject=Vendor%20Security%20Review%20-%20CAXiE%20Technologies"
                className="btn-secondary text-sm"
              >
                Email for vendor review
              </a>
              <Link href="/contact" className="btn-ghost text-sm">
                Send a detailed enquiry
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
