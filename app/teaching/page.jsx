import Link from 'next/link';

export const metadata = {
  title: 'Web Development Classes & Tech Mentorship — CAXiE Technologies',
  description:
    'CAXiE Technologies runs beginner web development classes and mentorship programs in Kano, Nigeria — building the next generation of Nigerian tech talent.',
  openGraph: {
    title: 'CAXiE Tech Classes — Beginner Web Development in Kano, Nigeria',
    description: 'Learn web development from a working practitioner. CAXiE Technologies runs structured beginner classes and 1-on-1 mentorship in Kano, Nigeria (and remotely).',
    url: 'https://caxietechnologies.com/teaching',
  },
};

const curriculum = [
  {
    module: 'Module 1',
    title: 'How the web works',
    topics: ['Internet fundamentals', 'Browsers and servers', 'Domain names and hosting', 'HTTP/HTTPS basics'],
    duration: '2 weeks',
  },
  {
    module: 'Module 2',
    title: 'HTML — Building structure',
    topics: ['Document structure', 'Semantic HTML', 'Forms and inputs', 'Accessibility basics'],
    duration: '2 weeks',
  },
  {
    module: 'Module 3',
    title: 'CSS — Styling and layout',
    topics: ['Selectors and properties', 'Flexbox and Grid', 'Responsive design', 'Mobile-first approach'],
    duration: '3 weeks',
  },
  {
    module: 'Module 4',
    title: 'JavaScript — Making it interactive',
    topics: ['Variables and functions', 'DOM manipulation', 'Events', 'Fetch API basics'],
    duration: '4 weeks',
  },
  {
    module: 'Module 5',
    title: 'Your first real project',
    topics: ['Project planning', 'Building a portfolio site', 'Deploying to the web', 'Getting your first client'],
    duration: '3 weeks',
  },
];

export default function TeachingPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Tech Classes</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-3xl leading-tight">
            Learn to build for the web.<br />
            <span className="gradient-text">Taught by someone who does it professionally.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            CAXiE Technologies runs beginner web development classes designed for people with zero technical background — in Kano, Nigeria, and remotely. This is how we invest in the next generation of Nigerian tech talent.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/2348165443398?text=Hi%2C%20I%27m%20interested%20in%20CAXiE%27s%20web%20development%20classes."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Enquire About Classes
            </a>
            <a href="#curriculum" className="btn-secondary">
              View Curriculum
            </a>
          </div>
        </div>
      </section>

      {/* WHY LEARN HERE */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="why-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-brand mb-4 inline-block">Why CAXiE classes</span>
            <h2 id="why-heading" className="section-title">Not a bootcamp. Not a YouTube playlist.</h2>
            <p className="section-subtitle mx-auto text-center">
              You learn from someone who builds production systems for real clients — including the very website you&apos;re reading now.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎓',
                title: 'Taught by a working practitioner',
                desc: 'Xavier teaches the same technologies he uses in client engagements — not outdated curriculum from 2015.',
              },
              {
                icon: '🛡️',
                title: 'Security built in from day one',
                desc: 'Security awareness is threaded through every module. You learn to build correctly, not just quickly.',
              },
              {
                icon: '🇳🇬',
                title: 'Nigerian context',
                desc: 'Examples, pricing, client expectations, and opportunities are all grounded in the Nigerian market — not Silicon Valley.',
              },
              {
                icon: '📱',
                title: 'Mobile-first by default',
                desc: 'Nigerian users are mobile-first. You learn to build for the audience you\'ll actually serve.',
              },
              {
                icon: '🤝',
                title: '1-on-1 mentorship available',
                desc: 'For learners who want more than group instruction — personalised sessions to match your pace and goals.',
              },
              {
                icon: '💼',
                title: 'Path to your first client',
                desc: 'The final module specifically covers how to package your skills, build a portfolio, and land your first paid project.',
              },
            ].map((item) => (
              <div key={item.title} className="card">
                <div className="text-3xl mb-4" aria-hidden="true">{item.icon}</div>
                <h3 className="font-display font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="section bg-[#1a0f2e] scroll-mt-20" aria-labelledby="curriculum-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-brand mb-4 inline-block">Curriculum</span>
            <h2 id="curriculum-heading" className="section-title">14-week programme</h2>
            <p className="section-subtitle mx-auto text-center">
              From zero to your first deployed website — with security awareness throughout.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {curriculum.map((mod, idx) => (
              <div key={mod.module} className="card border border-white/10 hover:border-brand-600/30">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-brand-400 text-xs font-bold uppercase tracking-widest">{mod.module}</span>
                    <h3 className="font-display font-semibold text-white text-lg mt-0.5">{mod.title}</h3>
                    <span className="text-gray-500 text-xs">{mod.duration}</span>
                  </div>
                  <div className="flex-1">
                    <ul className="flex flex-wrap gap-2">
                      {mod.topics.map((t) => (
                        <li key={t} className="badge bg-white/5 border border-white/10 text-gray-300 text-xs">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATS */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="formats-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="formats-heading" className="section-title">Learning formats</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: 'Group classes',
                desc: 'Small cohorts — in-person in Kano or live remote. Maximum 12 students per cohort to maintain interaction quality.',
                badge: 'Most popular',
                price: '[PLACEHOLDER: Group price]',
              },
              {
                name: '1-on-1 mentorship',
                desc: 'Personalised sessions at your pace. Ideal for learners with specific goals, irregular schedules, or who want faster progression.',
                badge: 'Premium',
                price: '[PLACEHOLDER: 1-on-1 price]',
              },
              {
                name: 'Corporate bootcamp',
                desc: 'Intensive workshops for organisations upskilling their teams — custom curriculum available.',
                badge: 'Enterprise',
                price: 'Custom pricing',
              },
            ].map((f) => (
              <div key={f.name} className="card border border-brand-600/20 bg-brand-600/5">
                <span className="badge-brand text-xs mb-4 inline-block">{f.badge}</span>
                <h3 className="font-display font-bold text-white text-lg mb-2">{f.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <p className="text-brand-400 font-semibold text-sm">{f.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">
            Ready to start learning?
          </h2>
          <p className="text-gray-400">
            Send us a WhatsApp message with your name and which format interests you. Xavier personally responds to class enquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348165443398?text=Hi%20Xavier%2C%20I%27m%20interested%20in%20joining%20the%20web%20development%20class.%20My%20name%20is%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Sign Up on WhatsApp
            </a>
            <Link href="/contact" className="btn-secondary">
              Send a formal enquiry
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            Classes run in Kano, Nigeria. Remote slots available. Enquire for next cohort dates.
          </p>
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
