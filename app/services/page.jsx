import Link from 'next/link';

export const metadata = {
  title: 'Services — AI, Software, Cybersecurity, Infrastructure & Fractional CTO',
  description:
    'CAXiE Technologies offers AI enablement, software development, cybersecurity, ICT infrastructure, data intelligence, and fractional CTO engagements from Kano, Nigeria.',
  openGraph: {
    title: 'CAXiE Technologies Services',
    description: 'Five core service lines built on a cybersecurity-first foundation — serving Nigerian businesses and international clients.',
    url: 'https://caxietechnologies.com/services',
  },
};

const services = [
  {
    id: 'cyber',
    title: 'Cybersecurity & Identity Protection',
    tagline: 'For organisations that cannot afford a breach.',
    color: 'text-green-400',
    bg: 'bg-green-400/10 border-green-400/20',
    accentBorder: 'border-l-green-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      "CAXiE's cybersecurity practice starts with one principle: your threat model exists whether or not you've documented it. We make it visible, then we address it — systematically, not reactively.",
    offerings: [
      'Threat protection strategy & implementation',
      'Digital identity & access management (IAM)',
      'Security audits, assessment, and hardening',
      'Vulnerability scanning & remediation',
      'Professional security awareness training',
      'Incident response planning',
    ],
    whoFor: 'Healthcare, finance, government, any organisation handling sensitive data or operating critical infrastructure.',
    process: [
      { step: '01', label: 'Discovery', desc: 'We map your current environment, identify assets, and document your current threat exposure.' },
      { step: '02', label: 'Assessment', desc: 'Formal vulnerability scan and security audit against industry baselines (NIST, ISO 27001 principles).' },
      { step: '03', label: 'Remediation plan', desc: 'Prioritised action plan with timelines and resource requirements — not a report that sits in a drawer.' },
      { step: '04', label: 'Implementation', desc: 'We execute the hardening plan alongside your team or independently, with full documentation.' },
      { step: '05', label: 'Ongoing monitoring', desc: 'Optional retainer for continuous monitoring, quarterly reviews, and incident response.' },
    ],
    caseStudyLink: '/case-studies/dala-orthopedic',
    caseStudyLabel: 'Dala Orthopedic — security posture implementation',
  },
  {
    id: 'ict',
    title: 'ICT Infrastructure',
    tagline: 'Networks and systems that actually work — and keep working.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
    accentBorder: 'border-l-blue-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    description:
      'Most Nigerian organisations are running networks that were designed for a third of their current load, on equipment that hasn\'t been reviewed since installation. We fix that — with systems designed to scale and built to survive the Nigerian operating environment.',
    offerings: [
      'Network design, installation & deployment',
      'Enterprise systems setup & configuration',
      'Cloud integration (AWS, Azure, Google Cloud)',
      'Server setup, virtualisation, and maintenance',
      'Network security hardening',
      'IT support & managed services',
    ],
    whoFor: 'Businesses establishing a new facility, scaling to new locations, or inheriting legacy infrastructure that needs a systematic overhaul.',
    process: [
      { step: '01', label: 'Site survey', desc: 'Physical and logical assessment of your current environment, including existing equipment, cabling, and bandwidth.' },
      { step: '02', label: 'Architecture design', desc: 'A network and systems architecture designed around your workload, not a standard template.' },
      { step: '03', label: 'Deployment', desc: 'Installation, configuration, and testing — with security hardened from day one.' },
      { step: '04', label: 'Handover & documentation', desc: 'Full network documentation and staff handover training so your team can manage what we build.' },
      { step: '05', label: 'Support retainer', desc: 'Optional ongoing support, monitoring, and maintenance — with defined SLAs.' },
    ],
    caseStudyLink: null,
    caseStudyLabel: null,
  },
  {
    id: 'data',
    title: 'Data & Intelligence',
    tagline: 'Your operational data is already worth something. Let\'s surface it.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    accentBorder: 'border-l-yellow-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description:
      'Most organisations collect data and do very little with it. CAXiE\'s data practice turns that operational data into dashboards, reports, and decision-support tools that actually get used — built around your team\'s real questions, not standard BI template reports.',
    offerings: [
      'Data analysis & interactive dashboards',
      'Business intelligence reporting & visualisation',
      'KPI tracking & decision-support systems',
      'Data pipeline design & management',
      'AI/ML data preparation and exploratory analysis',
      'Custom reporting for executive and board-level audiences',
    ],
    whoFor: 'Operations-heavy businesses, healthcare providers, financial services, and any organisation where decisions are being made on gut feel rather than data.',
    process: [
      { step: '01', label: 'Data audit', desc: 'We inventory your existing data sources — databases, spreadsheets, third-party systems — and assess data quality.' },
      { step: '02', label: 'Question mapping', desc: 'We document the 5-10 core business questions your leadership actually needs answered.' },
      { step: '03', label: 'Pipeline & dashboard build', desc: 'We build the data pipeline and dashboards to answer those questions — in your existing tools where possible.' },
      { step: '04', label: 'Training & handover', desc: 'Your team learns to read and interpret the dashboards, and we document the pipeline for your internal records.' },
      { step: '05', label: 'Iteration', desc: 'Quarterly reviews to update metrics as your business priorities evolve.' },
    ],
    caseStudyLink: null,
    caseStudyLabel: null,
  },
  {
    id: 'web',
    title: 'Web, Brand & Digital Marketing',
    tagline: 'A website that is invisible to search engines is not a website. It\'s a liability.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10 border-pink-400/20',
    accentBorder: 'border-l-pink-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    description:
      'CAXiE builds web presences that work technically and commercially. Every site is server-side rendered for search engine visibility, built to Core Web Vitals "Good" targets, and architected so a security reviewer can\'t find an obvious foothold.',
    offerings: [
      'Full-stack web development (Next.js, React)',
      'Server-side rendering & SEO-first architecture',
      'Brand identity design & visual systems',
      'Technical SEO & search visibility',
      'Social media management & digital content',
      'Beginner web development bootcamps & upskilling',
    ],
    whoFor: 'Businesses with existing sites that are invisible to search engines, startups establishing their first credible digital presence, and enterprises migrating from legacy platforms.',
    process: [
      { step: '01', label: 'Discovery brief', desc: 'We document your audience, competitive positioning, current visibility issues, and conversion goals.' },
      { step: '02', label: 'Architecture & design', desc: 'Sitemap, wireframes, design system — designed for conversion and technical SEO before a line of code is written.' },
      { step: '03', label: 'Development', desc: 'Server-rendered, accessible, performant build — with structured data, sitemap, and Open Graph metadata built in.' },
      { step: '04', label: 'Audit & hardening', desc: 'Dependency audit, WCAG 2.1 AA accessibility review, and Core Web Vitals verification before launch.' },
      { step: '05', label: 'Launch & handover', desc: 'DNS migration, CMS training, and 30-day post-launch support included.' },
    ],
    caseStudyLink: '/case-studies/dala-orthopedic',
    caseStudyLabel: 'Dala Orthopedic — web presence build',
  },
  {
    id: 'cto',
    title: 'Fractional & Consulting CTO',
    tagline: 'Enterprise-level technical leadership. Retainer model. No full-time overhead.',
    color: 'text-brand-400',
    bg: 'bg-brand-600/10 border-brand-600/20',
    accentBorder: 'border-l-brand-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    description:
      'Most growth-stage companies need a CTO-level thinker — someone to set technical direction, manage vendors, evaluate build vs. buy decisions, and prevent the technology decisions of today from becoming the $500k technical debt of next year. They just can\'t justify a full-time hire yet. That\'s this service.',
    offerings: [
      'Technology roadmap strategy & planning',
      'Vendor evaluation, selection & management',
      'Architecture oversight & technical governance',
      'Engineering team building & leadership',
      'Technical due diligence (for investors and acquirers)',
      'Build vs. buy decision frameworks',
      'Security posture and risk management',
    ],
    whoFor: 'Series A/B startups, growth-stage SMEs, and established businesses undertaking digital transformation who need a named senior technical leader without a full-time commitment.',
    process: [
      { step: '01', label: 'Technical audit', desc: 'We assess your current technology stack, team structure, vendor relationships, and outstanding technical debt.' },
      { step: '02', label: 'Roadmap development', desc: 'A 12-month technology roadmap aligned to your business objectives, with quarterly milestones.' },
      { step: '03', label: 'Engagement model', desc: 'Defined scope: weekly advisory calls, async access, vendor negotiation, board/investor attendance as needed.' },
      { step: '04', label: 'Active engagement', desc: 'Ongoing advisory, technical reviews, hiring input, and escalation path for technical decisions.' },
      { step: '05', label: 'Transition planning', desc: 'If/when the business is ready for a full-time CTO, we support the transition — including in-house candidate evaluation.' },
    ],
    caseStudyLink: '/case-studies/3stardata',
    caseStudyLabel: '3StarData — active fractional CTO engagement',
  },
  {
    id: 'software',
    title: 'Software & App Development',
    tagline: 'Custom software, mobile apps, and desktop applications — built to spec, not off a shelf.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10 border-orange-400/20',
    accentBorder: 'border-l-orange-400',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    description:
      'Off-the-shelf software solves generic problems. Most businesses have specific problems — processes, data flows, and workflows that don\'t fit neatly into what SaaS vendors offer. CAXiE builds bespoke software: web applications, native mobile apps for iOS and Android, and desktop tools — all engineered with security and maintainability as non-negotiables.',
    offerings: [
      'Custom web application development (React, Next.js, Node.js)',
      'Mobile app development — iOS (Swift) and Android (Kotlin/React Native)',
      'Desktop application development (cross-platform and native)',
      'API design, development, and third-party integration',
      'Legacy system modernisation and migration',
      'Software architecture and technical documentation',
      'QA testing, performance optimisation, and deployment',
      'Ongoing maintenance and feature development retainers',
    ],
    whoFor: 'Businesses with workflows that existing SaaS tools can\'t handle; organisations needing a mobile app to serve customers or staff; companies wanting to own their technology stack rather than rent it indefinitely.',
    process: [
      { step: '01', label: 'Requirements scoping', desc: 'We map your workflow, user journeys, and data requirements before writing a line of code. Skipping this is how projects fail.' },
      { step: '02', label: 'Architecture design', desc: 'We propose a technical architecture — stack, data model, integrations, security model — and walk you through it before we begin.' },
      { step: '03', label: 'Iterative development', desc: 'Development in two-week sprints with working software delivered at each sprint. You see real progress, not status updates.' },
      { step: '04', label: 'Testing & hardening', desc: 'QA, security review, and performance testing before any handover. We don\'t ship software we haven\'t tested under realistic conditions.' },
      { step: '05', label: 'Deployment & handover', desc: 'We deploy to your environment, document the system, and train your team. Ongoing support available under retainer.' },
    ],
    caseStudyLink: null,
    caseStudyLabel: null,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#0f0a1a]">
      {/* ══ HEADER ══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Services</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl leading-tight">
            Six service lines. One{' '}
            <span className="gradient-text">practical, resilient</span> foundation.
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            Whether you need to strengthen your systems, modernise your software, unlock your data, or bring senior technology leadership into your business, each service below is delivered with the same discipline and clarity.
          </p>
        </div>
      </section>

      {/* ══ SERVICE NAV ══ */}
      <div className="sticky top-16 z-40 bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container-max px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${s.color} hover:bg-white/5`}
              >
                {s.title.split(' ')[0]}
                {s.title.split(' ')[1] ? ' ' + s.title.split(' ')[1] : ''}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SERVICE SECTIONS ══ */}
      {services.map((svc, idx) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`section ${idx % 2 === 1 ? 'bg-[#1a0f2e]' : 'bg-[#0f0a1a]'} scroll-mt-32`}
          aria-labelledby={`${svc.id}-heading`}
        >
          <div className="container-max px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-start gap-5 mb-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border ${svc.bg} ${svc.color}`}>
                {svc.icon}
              </div>
              <div>
                <span className={`text-xs font-semibold uppercase tracking-widest ${svc.color} mb-1 block`}>
                  {String(idx + 1).padStart(2, '0')} / 06
                </span>
                <h2 id={`${svc.id}-heading`} className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {svc.title}
                </h2>
                <p className={`${svc.color} font-medium mt-1`}>{svc.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Description + offerings */}
              <div className="lg:col-span-2 space-y-8">
                <p className="text-gray-300 text-lg leading-relaxed">{svc.description}</p>

                <div>
                  <h3 className="font-display font-semibold text-white mb-4">What's included</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.offerings.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-gray-400 text-sm">
                        <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${svc.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div>
                  <h3 className="font-display font-semibold text-white mb-4">How it works</h3>
                  <div className="space-y-4">
                    {svc.process.map((p) => (
                      <div key={p.step} className={`border-l-4 ${svc.accentBorder} pl-4 py-1`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold ${svc.color}`}>{p.step}</span>
                          <span className="font-display font-semibold text-white">{p.label}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Who it's for */}
                <div className="card">
                  <h3 className="font-display font-semibold text-white mb-3 text-sm uppercase tracking-wider">Who it&apos;s for</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{svc.whoFor}</p>
                </div>

                {/* Case study */}
                {svc.caseStudyLink && (
                  <div className={`card border ${svc.bg}`}>
                    <h3 className={`font-display font-semibold mb-2 text-sm uppercase tracking-wider ${svc.color}`}>Live case study</h3>
                    <p className="text-white text-sm mb-3">{svc.caseStudyLabel}</p>
                    <Link href={svc.caseStudyLink} className={`text-sm font-medium ${svc.color} hover:underline`}>
                      Read the full case study →
                    </Link>
                  </div>
                )}

                {/* CTA */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20${encodeURIComponent(svc.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center text-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Discuss this service
                  </a>
                  <Link href="/pricing" className="btn-secondary w-full justify-center text-sm">
                    View pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══ FINAL CTA ══ */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">
            Not sure which service fits?
          </h2>
          <p className="text-gray-400">
            Describe your business challenge — we&apos;ll recommend the right engagement model and give you a straight answer about whether CAXiE is the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27m%20not%20sure%20which%20service%20I%20need%20but%20here%27s%20my%20challenge%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Describe Your Challenge
            </a>
            <Link href="/contact" className="btn-secondary">
              Send a project brief
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
