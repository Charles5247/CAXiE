import Link from 'next/link';

export const metadata = {
  title: 'Pricing — CAXiE Technologies',
  description:
    'Transparent pricing for CAXiE Technologies services — cybersecurity, ICT infrastructure, web development, data analytics, and fractional CTO engagements. Based in Kano, Nigeria.',
  openGraph: {
    title: 'CAXiE Technologies Pricing',
    description: 'Tiered pricing for IT consultancy, cybersecurity, web development, and fractional CTO services.',
    url: 'https://caxietechnologies.com/pricing',
  },
};

const pricingTiers = [
  {
    name: 'Starter',
    badge: 'For small teams & early-stage businesses',
    price: '₦150,000 – ₦500,000',
    period: 'per project',
    placeholder: true,
    color: 'border-white/20',
    headingColor: 'text-white',
    description:
      'Entry-level engagements for businesses needing a specific, scoped deliverable — a website, a security audit, or a data dashboard.',
    features: [
      'Single-service project delivery',
      'Website development (up to 5 pages)',
      'Basic security audit & report',
      'Simple data dashboard setup',
      '30-day post-delivery support',
      'WhatsApp + email communication',
    ],
    cta: 'Get a quote',
    ctaHref: 'https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27m%20interested%20in%20the%20Starter%20tier.',
    highlighted: false,
  },
  {
    name: 'Growth',
    badge: 'Most popular for SMEs',
    price: '₦500,000 – ₦2,500,000',
    period: 'per project or monthly retainer',
    placeholder: true,
    color: 'border-brand-600',
    headingColor: 'text-brand-400',
    description:
      'For growing businesses that need a complete solution — web presence + SEO, infrastructure overhaul, or an ongoing data intelligence practice.',
    features: [
      'Multi-service project delivery',
      'Full web presence build with SEO',
      'Comprehensive security assessment',
      'ICT infrastructure design & deployment',
      'BI dashboard + reporting suite',
      'Monthly retainer option',
      '90-day post-delivery support',
      'Priority response (< 4 hrs)',
    ],
    cta: 'Start a conversation',
    ctaHref: 'https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27m%20interested%20in%20the%20Growth%20tier.',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    badge: 'For complex, multi-team engagements',
    price: 'Custom',
    period: 'scoped on project requirements',
    placeholder: false,
    color: 'border-white/20',
    headingColor: 'text-white',
    description:
      'Full-scope technology transformation, fractional CTO engagements, and enterprise-level infrastructure — priced around your actual requirements.',
    features: [
      'Full digital transformation scope',
      'Fractional CTO retainer (Xavier)',
      'Multi-location infrastructure deployment',
      'Enterprise data platform',
      'Dedicated account management',
      'SLA-backed support agreement',
      'Board/investor-level reporting',
      'Custom contract structure',
    ],
    cta: 'Request a proposal',
    ctaHref: 'https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20an%20Enterprise%20engagement.',
    highlighted: false,
  },
];

const addons = [
  { name: 'Security awareness training (per session)', price: '₦80,000 – ₦200,000', placeholder: true },
  { name: 'Additional post-launch support months', price: '₦50,000/month', placeholder: true },
  { name: 'SEO content production (per article)', price: '₦25,000 – ₦60,000', placeholder: true },
  { name: 'Emergency incident response', price: 'Contact for rate', placeholder: false },
];

const faq = [
  {
    q: 'Are these prices in Nigerian Naira?',
    a: 'Yes. All prices on this page are in Nigerian Naira (₦). For international clients, we can scope and invoice in USD or GBP — just mention your preference when you get in touch.',
  },
  {
    q: 'What happens after I contact you?',
    a: 'Within 24 hours, Xavier or a team member will respond to schedule a discovery call. We\'ll ask about your project, current systems, and timeline — then send a written proposal with scope, deliverables, and pricing within 48–72 hours.',
  },
  {
    q: 'Do you work on fixed-price or time-and-materials?',
    a: 'Most of our engagements are fixed-scope and fixed-price — so you know exactly what you\'re getting and what it costs before we start. For ongoing advisory and retainer work, we use monthly fixed-rate agreements.',
  },
  {
    q: 'Can I start small and scale up?',
    a: 'Yes. Many clients start with a Starter-tier project to evaluate how we work, then move to a Growth retainer. We actively support this — we\'d rather earn a long-term relationship than oversell a large engagement upfront.',
  },
  {
    q: 'What\'s your payment structure?',
    a: 'Standard structure is 50% upfront and 50% on delivery for project work. Retainer engagements are billed monthly in advance. We\'ll confirm the exact structure in your proposal.',
  },
  {
    q: 'Are the Fractional CTO engagements included in these tiers?',
    a: 'Fractional CTO is an Enterprise-tier engagement, custom-scoped. Xavier\'s current engagement with 3StarData is structured as retainer + equity — we\'re open to similar structures for the right partnerships. Message us to discuss.',
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Pricing</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            Transparent pricing.<br />
            <span className="gradient-text">No surprises.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            The prices below are indicative ranges based on typical project scope.{' '}
            <strong className="text-white">[PLACEHOLDER: Xavier to confirm final tier names, price points, and inclusions before launch.]</strong>{' '}
            Every engagement gets a written proposal before we start — so you know exactly what you&apos;re paying for.
          </p>
          <div className="mt-6 bg-brand-600/10 border border-brand-600/20 rounded-xl p-4 inline-block">
            <p className="text-brand-300 text-sm">
              💡 <strong className="text-white">Pricing philosophy:</strong> We scope around outcomes, not hours. You pay for results — not time-tracked reports.
            </p>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section className="section" aria-labelledby="pricing-tiers-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h2 id="pricing-tiers-heading" className="sr-only">Pricing tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl border-2 p-8 flex flex-col ${tier.color} ${
                  tier.highlighted ? 'bg-brand-600/10 shadow-brand-lg' : 'bg-white/3'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-brand">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">{tier.badge}</p>
                  <h3 className={`font-display font-bold text-2xl mb-1 ${tier.headingColor}`}>{tier.name}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="font-display font-bold text-3xl text-white">{tier.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{tier.period}</p>
                  {tier.placeholder && (
                    <p className="text-yellow-500/70 text-xs mt-1">* Indicative — final prices to be confirmed</p>
                  )}
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{tier.description}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={tier.highlighted ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="section bg-[#1a0f2e]" aria-labelledby="addons-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h2 id="addons-heading" className="font-display font-bold text-2xl text-white mb-8">Common add-ons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addons.map((a) => (
              <div key={a.name} className="card flex items-center justify-between gap-4">
                <span className="text-gray-300 text-sm">{a.name}</span>
                <span className={`font-semibold text-sm flex-shrink-0 ${a.placeholder ? 'text-yellow-400' : 'text-brand-400'}`}>
                  {a.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS AFTER SIGNING UP */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="process-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-brand mb-4 inline-block">What happens next</span>
            <h2 id="process-heading" className="section-title">After you get in touch</h2>
            <p className="section-subtitle mx-auto text-center">
              We believe buying friction is a hidden cost. Here&apos;s exactly what happens from first contact to project kickoff.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '1', label: 'You contact us', desc: 'WhatsApp or contact form — whichever is easier. Tell us what you need.' },
              { step: '2', label: 'Discovery call', desc: 'Within 24 hours, we schedule a 30-minute call to understand your project and environment.' },
              { step: '3', label: 'Written proposal', desc: 'Within 48–72 hours of the call: scope, deliverables, timeline, and fixed price in writing.' },
              { step: '4', label: 'Project kickoff', desc: 'Once the proposal is accepted and first payment confirmed, we start within agreed SLA.' },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center font-bold text-white mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#1a0f2e]" aria-labelledby="faq-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="section-title">Pricing FAQs</h2>
          </div>
          <div className="space-y-6">
            {faq.map((item) => (
              <div key={item.q} className="card">
                <h3 className="font-display font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-brand-900 to-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-bold text-3xl text-white">Ready to get a proposal?</h2>
          <p className="text-gray-400">It starts with a conversation. Tell us what you need — we&apos;ll tell you what it costs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20get%20a%20project%20proposal."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp for a Quote
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
