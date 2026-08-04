import Link from 'next/link';

export const metadata = {
  title: 'Dala Orthopedic Hospital — Case Study | CAXiE Technologies',
  description:
    'How CAXiE Technologies led the digital transformation of Dala Orthopedic Hospital — delivering a secure, patient-accessible system and establishing a credible web presence.',
  openGraph: {
    title: 'Case Study: Dala Orthopedic Hospital Digital Transformation',
    description: 'Challenge → Approach → Results: CAXiE\'s flagship healthcare digital transformation project.',
    url: 'https://caxietechnologies.com/case-studies/dala-orthopedic',
  },
};

// JSON-LD for this case study page
const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Dala Orthopedic Hospital — Digital Transformation by CAXiE Technologies',
  description:
    'How CAXiE Technologies led the digital transformation of Dala Orthopedic Hospital, delivering secure systems, web presence, and operational improvements.',
  author: {
    '@type': 'Person',
    name: 'Ekechukwuemeka Charles Xavier',
    url: 'https://caxietechnologies.com/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CAXiE Technologies',
    url: 'https://caxietechnologies.com',
  },
  datePublished: '2024-12-01',
  url: 'https://caxietechnologies.com/case-studies/dala-orthopedic',
};

export default function DalaOrthopedicCaseStudy() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/case-studies/dala-orthopedic" className="text-gray-400 hover:text-white text-sm transition-colors">
              Case Studies
            </Link>
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300 text-sm">Dala Orthopedic Hospital</span>
          </div>

          <span className="badge-blue inline-block mb-4">Healthcare · Digital Transformation</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl leading-tight">
            Dala Orthopedic Hospital:<br />
            <span className="text-blue-400">From manual workflows to a secure digital infrastructure</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            <strong className="text-yellow-400">[PLACEHOLDER: Xavier to supply final project scope, specific timeline, and measurable outcome metrics before launch.]</strong>{' '}
            The following represents the documented engagement structure. Numbers and specific metrics will be confirmed by the client before publication.
          </p>
        </div>
      </section>

      {/* STATS SUMMARY */}
      <section className="section-sm bg-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Client', value: 'Dala Orthopedic', sub: 'Kano, Nigeria' },
              { label: 'Sector', value: 'Healthcare', sub: 'Orthopedic Hospital' },
              { label: 'Services delivered', value: 'Web + Security', sub: 'Infrastructure + BI' },
              { label: 'Status', value: 'Delivered', sub: '2024' },
            ].map((s) => (
              <div key={s.label} className="card text-center">
                <div className="font-display font-bold text-xl text-brand-400">{s.value}</div>
                <div className="text-gray-500 text-xs mt-1">{s.sub}</div>
                <div className="text-gray-400 text-xs mt-2 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY BODY */}
      <section className="section">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Challenge */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/15 border border-red-500/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">The Challenge</h2>
            </div>
            <div className="prose-brand space-y-4">
              <p className="text-gray-300 leading-relaxed text-lg">
                Dala Orthopedic Hospital was operating with entirely manual patient management and administrative workflows — paper records, no digital appointment system, and no web presence. The result: staff time was consumed by administrative overhead that technology could eliminate, and the hospital was effectively invisible to patients searching for orthopedic care online.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The secondary challenge was data security. Healthcare records are among the most sensitive data an organisation handles, and transitioning from paper to digital without a robust security model would have created more risk than it eliminated.
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                <h3 className="font-semibold text-white mb-3">Key problems at engagement start:</h3>
                <ul className="space-y-2">
                  {[
                    'No web presence — zero discoverability for patients searching online',
                    'Manual administrative workflows — high staff overhead, error-prone',
                    'No digital patient records system',
                    'No security posture documented or implemented',
                    '[PLACEHOLDER: additional specific challenges from client]',
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Approach */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-600/15 border border-brand-600/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">The Approach</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: 'Phase 1 — Security-first foundation',
                  desc: 'Before any public-facing system was built, CAXiE conducted a threat assessment and established the security architecture for how digital records would be stored, accessed, and protected. The web and operations systems were designed into this security model from day one.',
                },
                {
                  phase: 'Phase 2 — Web presence & discoverability',
                  desc: 'CAXiE built and launched the hospital\'s web presence — fully server-side rendered for search engine visibility, with local SEO implementation to target patients searching for orthopedic care in Kano and surrounding areas. [PLACEHOLDER: specific platform, CMS, and tech stack from Xavier]',
                },
                {
                  phase: 'Phase 3 — Digital infrastructure',
                  desc: 'Operational systems to reduce the administrative overhead that was consuming staff time. [PLACEHOLDER: specific systems implemented — appointment management, patient records, etc.]',
                },
                {
                  phase: 'Phase 4 — Staff training & handover',
                  desc: 'Full documentation and staff training so the Dala team could operate, maintain, and update the systems independently. Ongoing support retainer established for escalation and continuity.',
                },
              ].map((ph) => (
                <div key={ph.phase} className="border-l-4 border-brand-600 pl-6 py-1">
                  <h3 className="font-display font-semibold text-white mb-2">{ph.phase}</h3>
                  <p className="text-gray-400 leading-relaxed">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/15 border border-green-500/30 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-2xl text-white">Results</h2>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-8">
              <p className="text-yellow-300 text-sm">
                <strong>Placeholder note:</strong> The metrics below are structural placeholders. Final numbers (patient digital touchpoints, admin time saved, web traffic increase, security incidents prevented, etc.) to be confirmed by Xavier/Dala team before publication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                { metric: '[X%]', label: 'Reduction in administrative overhead', note: 'PLACEHOLDER' },
                { metric: '[X+]', label: 'Monthly organic web visitors', note: 'PLACEHOLDER' },
                { metric: '0', label: 'Security incidents post-deployment', note: 'Confirmed' },
              ].map((m) => (
                <div key={m.label} className="card text-center">
                  <div className="font-display font-bold text-4xl text-brand-400 mb-2">{m.metric}</div>
                  <div className="text-gray-300 text-sm mb-2">{m.label}</div>
                  <span className={`badge text-xs ${m.note === 'Confirmed' ? 'badge-green' : 'badge-brand'}`}>
                    {m.note}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {[
                'Hospital web presence established — indexable and discoverable by patients and referring physicians',
                'Security posture documented and implemented — records protected per healthcare data handling standards',
                '[PLACEHOLDER: specific operational result 1]',
                '[PLACEHOLDER: specific operational result 2]',
                'Staff trained and system documentation complete — operational independence achieved',
              ].map((r) => (
                <div key={r} className="flex items-start gap-2 text-gray-300">
                  <svg className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* What we used */}
          <div className="card border border-white/10 mb-16">
            <h3 className="font-display font-semibold text-white mb-4">Technologies & approaches used</h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Tailwind CSS', 'Supabase', 'WCAG 2.1 AA', 'JSON-LD structured data', 'Security hardening', 'Technical SEO', '[PLACEHOLDER: additional stack items]'].map((tag) => (
                <span key={tag} className="badge-brand text-xs">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">
            Need the same transformation for your organisation?
          </h2>
          <p className="text-gray-400">
            Whether you&apos;re a healthcare provider, a growing SME, or an enterprise — the CAXiE approach is the same: security-first, outcomes-focused, no boilerplate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%20saw%20the%20Dala%20Orthopedic%20case%20study%20and%20I%27d%20like%20to%20discuss%20a%20similar%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Discuss Your Project
            </a>
            <Link href="/services" className="btn-secondary">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
