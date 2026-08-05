import Link from 'next/link';
import jobs from '@/data/jobs.json';

export const metadata = {
  title: 'Careers — Join CAXiE Technologies',
  description:
    'Explore open roles at CAXiE Technologies — a cybersecurity-first IT consultancy in Kano, Nigeria. We hire engineers, analysts, and strategists who want to build technology that matters.',
  openGraph: {
    title: 'Careers at CAXiE Technologies',
    description: 'Join the team behind cybersecurity, infrastructure, and digital transformation in Nigeria.',
    url: 'https://caxietechnologies.com/careers',
  },
  robots: { index: true, follow: true },
};

const typeColors = {
  'Full-Time': 'bg-green-400/10 text-green-400 border-green-400/20',
  'Part-Time': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Contract': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  'Internship': 'bg-brand-600/10 text-brand-400 border-brand-600/20',
};

export default function CareersPage() {
  const hasJobs = jobs.length > 0;

  return (
    <div className="bg-[#0f0a1a]">
      {/* ══ PAGE HEADER ══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Careers</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            Build technology that{' '}
            <span className="gradient-text">actually matters.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            At CAXiE, every person on the team works on real client problems with real consequences — not demos or internal tools. We operate lean, move with urgency, and hold each other to a high standard.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { icon: '📍', text: 'Based in Kano, Nigeria' },
              { icon: '🌍', text: 'Remote-friendly roles available' },
              { icon: '🛡️', text: 'Security-first engineering culture' },
              { icon: '🤝', text: 'Founder-accountable leadership' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-gray-400">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CULTURE ══ */}
      <section className="section bg-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'We are not an agency.',
                desc: 'CAXiE takes strategic ownership of client outcomes. If you want to show up, write code, and leave — this is not the right fit. If you want to understand why the client has a problem and solve it properly, keep reading.',
                icon: '🎯',
              },
              {
                title: 'Security is everyone\'s job.',
                desc: 'We don\'t have a security team separate from the engineering team. Threat modelling, secure coding practices, and vulnerability awareness are baseline expectations for every role.',
                icon: '🛡️',
              },
              {
                title: 'Remote without chaos.',
                desc: 'We are async-first for day-to-day work, with structured weekly syncs. You\'ll have clear goals, measurable deliverables, and direct access to the founder — no management layers.',
                icon: '⚡',
              },
            ].map((item) => (
              <div key={item.title} className="card">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ══ JOB LISTINGS ══ */}
          <div>
            <h2 className="section-title mb-2">
              {hasJobs ? 'Current openings' : 'No open roles right now'}
            </h2>
            <p className="text-gray-400 mb-10 max-w-2xl">
              {hasJobs
                ? `We have ${jobs.length} open position${jobs.length > 1 ? 's' : ''} at the moment. All roles are open to exceptional candidates across Nigeria.`
                : 'We don\'t have any open roles listed at the moment — but we\'re always interested in meeting exceptional people. Send us your CV and tell us what you can do.'}
            </p>

            {hasJobs ? (
              <div className="space-y-6">
                {jobs.map((job) => (
                  <article
                    key={job.id}
                    className="card border border-white/10 hover:border-brand-600/40 transition-colors group"
                    aria-label={`Job listing: ${job.title}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-white text-xl group-hover:text-brand-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${typeColors[job.type] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                            {job.type}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243A8 8 0 1112 20a7.963 7.963 0 01-4.243-1.243z" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {job.department}
                          </span>
                        </div>
                      </div>
                      <a
                        href={`mailto:${job.applyEmail}?subject=Application: ${encodeURIComponent(job.title)} (${job.id})`}
                        className="btn-primary flex-shrink-0 text-sm"
                      >
                        Apply Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-5">{job.summary}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Requirements</h4>
                        <ul className="space-y-1.5">
                          {job.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                              <svg className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                              </svg>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {job.niceToHave && job.niceToHave.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Nice to have</h4>
                          <ul className="space-y-1.5">
                            {job.niceToHave.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-gray-600">Posted {new Date(job.postedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <a
                        href={`mailto:${job.applyEmail}?subject=Application: ${encodeURIComponent(job.title)} (${job.id})`}
                        className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        Send application
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {/* Always show speculative applications */}
            <div className="mt-10 card border border-brand-600/20 bg-brand-600/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-white mb-1">
                    Don&apos;t see your role? Send your CV anyway.
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We grow our team based on capability, not just open headcount. If you&apos;re exceptional at cybersecurity, software engineering, data science, or IT infrastructure — introduce yourself. We review speculative applications seriously.
                  </p>
                </div>
                <a
                  href="mailto:careers@caxietechnologies.com?subject=Speculative Application — CAXiE Technologies"
                  className="btn-secondary flex-shrink-0 text-sm"
                >
                  Send your CV
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="section bg-gradient-to-b from-[#0f0a1a] to-[#1a0f2e]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-2 text-center">Our hiring process</h2>
          <p className="section-subtitle text-center mx-auto mb-12">We keep it simple and move fast.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Application', desc: 'Send your CV and a short note on what you can contribute. No cover letter templates — be specific.' },
              { step: '02', title: 'Intro call', desc: '30-minute call with Xavier. We want to understand your experience and what motivates you.' },
              { step: '03', title: 'Technical assessment', desc: 'A focused, role-relevant task — usually 2–4 hours. We respect your time and always give feedback.' },
              { step: '04', title: 'Offer', desc: 'If it\'s a fit on both sides, we move to offer within 5 business days of your final assessment.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 bg-brand-600/20 border border-brand-600/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-400 font-bold text-sm">{s.step}</span>
                </div>
                <h3 className="font-display font-semibold text-white mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
