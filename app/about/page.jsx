import Image from 'next/image';
import Link from 'next/link';
import team from '@/data/team.json';

export const metadata = {
  title: 'About & Leadership — CAXiE Technologies',
  description:
    'Meet Ekechukwuemeka Charles Xavier, founder and CEO of CAXiE Technologies. Cybersecurity practitioner, technology strategist, and fractional CTO based in Kano, Nigeria.',
  openGraph: {
    title: 'About CAXiE Technologies & Founder Xavier',
    description: 'The story, people, and values behind CAXiE Technologies — a founder-led Nigerian IT consultancy.',
    url: 'https://caxietechnologies.com/about',
  },
};

const timeline = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'CAXiE Technologies established in Nigeria with a cybersecurity-first mandate — to deliver enterprise-grade technology to clients who had previously been underserved by generic solutions.',
  },
  {
    year: '2022',
    title: 'Infrastructure expansion',
    description: 'Expanded service delivery to include full ICT infrastructure deployment — networks, cloud integration, and systems support — for Nigerian businesses of all sizes.',
  },
  {
    year: '2023',
    title: 'Data & Intelligence practice',
    description: 'Launched data analytics and business intelligence practice, enabling clients to convert operational data into actionable insights and decision-support tools.',
  },
  {
    year: '2024',
    title: 'Dala Orthopedic engagement',
    description: 'Delivered the flagship Dala Orthopedic digital transformation project — building a secure, patient-accessible system that replaced manual workflows across the organisation.',
  },
  {
    year: '2025',
    title: 'Fractional CTO practice & 3StarData',
    description: 'Xavier engaged as incoming fractional CTO for 3StarData under a retainer + equity model — formalising CAXiE\'s executive technology leadership offering for growth-stage companies.',
  },
];

const values = [
  {
    title: 'Cybersecurity-First',
    description: 'Security is not an add-on. Every system we build, every network we deploy, every application we develop starts with a threat model.',
    icon: '🛡️',
  },
  {
    title: 'Specific Over Generic',
    description: 'We refuse to deliver template solutions. Every engagement is diagnosed against the client\'s actual environment, not a standard package.',
    icon: '🎯',
  },
  {
    title: 'Founder Accountability',
    description: 'Xavier is personally accountable for every delivery. When you work with CAXiE, you have a named, reachable person who owns your outcome.',
    icon: '🤝',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We measure success in years, not projects. Our retainer and fractional models are designed for clients who want technology to grow with their business.',
    icon: '📈',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      {/* ══ PAGE HEADER ══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">About</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            A founder-led firm, not an agency.<br />
            <span className="gradient-text">That difference matters.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            CAXiE Technologies was built on one conviction: that world-class technical delivery is a matter of discipline and intention, not geography. We operate from Kano, Nigeria, and compete globally.
          </p>
        </div>
      </section>

      {/* ══ FOUNDER BIO ══ */}
      <section className="section" aria-labelledby="founder-bio-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-brand-lg">
                <Image
                  src="/founder.JPG"
                  alt="Ekechukwuemeka Charles Xavier — Founder & CEO of CAXiE Technologies"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 450px"
                  priority
                />
              </div>
              {/* Card overlay */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#0f0a1a] border border-white/15 rounded-2xl p-5 shadow-brand max-w-xs">
                <p className="font-display font-bold text-white">Ekechukwuemeka Charles Xavier</p>
                <p className="text-brand-400 text-sm">Founder & CEO</p>
                <div className="brand-divider my-3" />
                <div className="flex gap-4">
                  <a href="https://x.com/iamxavi_too" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-400 transition-colors text-xs">
                    @iamxavi_too on X
                  </a>
                  <a href="https://www.instagram.com/iamxavi_too/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-400 transition-colors text-xs">
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 id="founder-bio-heading" className="font-display font-bold text-3xl text-white">
                Ekechukwuemeka Charles Xavier
              </h2>
              <p className="text-brand-400 font-medium">Founder & CEO · CAXiE Technologies</p>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Xavier founded CAXiE Technologies to bring enterprise-grade technical capability to clients — Nigerian businesses, institutions, and international companies — who had been forced to choose between generic local providers and expensive international firms.
                </p>
                <p>
                  His practice spans cybersecurity and identity protection, ICT infrastructure deployment, data analytics and business intelligence, and full-stack web development. He holds a cybersecurity-first philosophy: any system built or deployed by CAXiE begins with a threat model, not an assumption of safety.
                </p>
                <p>
                  As the incoming fractional CTO for 3StarData — a Nigerian VTU/digital services platform — Xavier is engaged under a retainer + equity model with a defined transition clause to full-time CTO. This is what CAXiE means by commitment: not a consulting report, but shared ownership of outcomes.
                </p>
              </div>

              {/* Fractional CTO callout */}
              <div className="bg-brand-600/10 border border-brand-600/20 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Available for fractional CTO engagements</p>
                    <p className="text-gray-400 text-sm">
                      Xavier is available for fractional and consulting CTO engagements with growth-stage companies and SMEs that need senior technical leadership without a full-time commitment. Engagements are structured around your roadmap, not a generic retainer.
                    </p>
                    <Link href="/services#cto" className="text-brand-400 text-sm hover:underline mt-2 inline-block">
                      Learn about the Fractional CTO model →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap pt-2">
                <a
                  href="https://wa.me/2348165443398?text=Hi%20Xavier%2C%20I%27d%20like%20to%20discuss%20a%20fractional%20CTO%20engagement."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Contact Xavier directly
                </a>
                <Link href="/contact" className="btn-secondary text-sm">
                  Send a project brief
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMPANY STORY / TIMELINE ══ */}
      <section className="section bg-gradient-to-b from-[#0f0a1a] to-[#1a0f2e]" aria-labelledby="story-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-brand mb-4 inline-block">Company Story</span>
            <h2 id="story-heading" className="section-title">How CAXiE got here</h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-600/40 to-transparent" aria-hidden="true" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative pl-12 sm:pl-20">
                  {/* Dot */}
                  <div className="absolute left-1.5 sm:left-5.5 top-1 w-5 h-5 bg-brand-600 rounded-full border-4 border-[#0f0a1a] shadow-brand" />
                  <div className="badge-brand text-xs mb-2 inline-block">{item.year}</div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="section bg-[#1a0f2e]" aria-labelledby="values-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-brand mb-4 inline-block">What We Stand For</span>
            <h2 id="values-heading" className="section-title">Our values aren&apos;t a wall poster</h2>
            <p className="section-subtitle mx-auto text-center">
              These four principles determine what we build, how we price it, and which clients we take on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card">
                <div className="text-3xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="mission-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="mission-heading" className="font-display font-bold text-2xl text-brand-400 mb-6">Our mission</h2>
            <blockquote className="font-display text-2xl sm:text-3xl text-white font-medium leading-relaxed italic">
              &ldquo;To prove strength one uses knowledge to destroy his enemies, but a great man, a wise man uses knowledge to create wealth and make impact that lives for generations.&rdquo;
            </blockquote>
            <p className="mt-6 text-gray-400">— Ekechukwuemeka Charles Xavier, Founder</p>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#1a0f2e]" aria-labelledby="about-cta-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 id="about-cta-heading" className="font-display font-bold text-3xl text-white">
              Now you know who&apos;s behind the work. Let&apos;s talk about yours.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Start on WhatsApp
              </a>
              <Link href="/contact" className="btn-secondary">
                Send a project brief
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM / LEADERSHIP ══ */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="team-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-brand inline-block mb-4">Leadership</span>
            <h2 id="team-heading" className="section-title">The people behind CAXiE</h2>
            <p className="section-subtitle mx-auto text-center">
              CAXiE is a founder-led firm. Every client engagement has a named, accountable person at the top of it — not an account manager you can never reach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.id}
                className="card border border-white/10 hover:border-brand-600/30 transition-colors flex flex-col items-center text-center group"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 ring-2 ring-brand-600/20 group-hover:ring-brand-600/40 transition-all flex-shrink-0">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-600/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Info */}
                <h3 className="font-display font-bold text-white text-lg leading-snug">{member.name}</h3>
                <p className="text-brand-400 text-sm font-medium mt-1 mb-3">{member.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                {/* Specialties */}
                {member.specialties && member.specialties[0] !== 'Coming Soon' && (
                  <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                    {member.specialties.map((s) => (
                      <span key={s} className="text-xs bg-brand-600/10 text-brand-300 border border-brand-600/20 px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {/* Social links */}
                {member.social && Object.keys(member.social).length > 0 && (
                  <div className="flex gap-2 mt-auto pt-3 border-t border-white/5 w-full justify-center">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-600/40 transition-all">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-600/40 transition-all">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-400 hover:border-brand-600/40 transition-all">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12 24 5.73 18.77.5 12 .5z"/></svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Advisory board and additional team member announcements coming Q4 2025.{' '}
              <Link href="/careers" className="text-brand-400 hover:text-brand-300 transition-colors">
                See open roles.
              </Link>
            </p>
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
