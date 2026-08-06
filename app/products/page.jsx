import Link from 'next/link';
import products from '@/data/products.json';

export const metadata = {
  title: 'Our Products — CAXiE Technologies',
  description:
    'CAXiE Technologies is building its own software products alongside client work — security monitoring, data integration, and web security tools purpose-built for Nigerian businesses.',
  openGraph: {
    title: 'CAXiE Technologies Products',
    description: 'Software and tools built by CAXiE — for Nigerian businesses, from Kano to the world.',
    url: 'https://caxietechnologies.com/products',
  },
};

const iconMap = {
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

const statusColors = {
  'In Development': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  'Concept / Design': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  'Concept': 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  'Live': 'bg-green-400/10 text-green-400 border-green-400/20',
};

export default function ProductsPage() {
  return (
    <div className="bg-[#0f0a1a]">
      {/* ══ PAGE HEADER ══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Our Products</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            Software we build{' '}
            <span className="gradient-text">for ourselves — and for you.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            Alongside client engagements, CAXiE is developing its own software products — tools that address gaps we encounter repeatedly in the Nigerian business environment. These are not side projects; they are direct extensions of our core service lines.
          </p>
          <div className="mt-8 p-4 bg-brand-600/10 border border-brand-600/20 rounded-xl inline-block">
            <p className="text-brand-300 text-sm">
              💡 <strong>Early access:</strong> Interested in beta testing any of these products? {' '}
              <a href="mailto:contact@caxietechnologies.com?subject=Product Beta Interest" className="underline hover:text-white transition-colors">
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══ PRODUCTS GRID ══ */}
      <section className="section bg-[#0f0a1a]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className={`card border ${product.bg} flex flex-col hover:scale-[1.01] transition-transform duration-200`}
                aria-label={`Product: ${product.name}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${product.bg}`}>
                    <span className={product.color}>{iconMap[product.icon]}</span>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[product.status] || 'bg-gray-700 text-gray-400 border-gray-600'}`}>
                    {product.status}
                  </span>
                </div>

                {/* Name & tagline */}
                <h2 className="font-display font-bold text-white text-xl mb-1">{product.name}</h2>
                <p className={`text-sm font-medium mb-3 ${product.color}`}>{product.tagline}</p>
                <span className="text-xs text-gray-500 bg-white/5 rounded-full px-2.5 py-1 w-fit mb-4">{product.category}</span>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{product.description}</p>

                {/* Features */}
                <div className="mb-5">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key features</h3>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <svg className={`w-4 h-4 ${product.color} flex-shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audience */}
                <div className="p-3 bg-white/5 rounded-xl mb-5">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <span className="text-gray-300 font-medium">Built for: </span>
                    {product.targetAudience}
                  </p>
                </div>

                {/* Stage & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-600">{product.stage}</p>
                  <a
                    href={`mailto:contact@caxietechnologies.com?subject=Product Interest: ${encodeURIComponent(product.name)}`}
                    className={`text-sm font-medium flex items-center gap-1 transition-colors ${product.color} hover:opacity-80`}
                  >
                    Get notified
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              More products are in the pipeline.{' '}
              <a href="/contact" className="text-brand-400 hover:text-brand-300 transition-colors">
                Contact us
              </a>{' '}
              if you have a product idea you&apos;d like CAXiE to build or co-develop.
            </p>
          </div>
        </div>
      </section>

      {/* ══ BUILD WITH US ══ */}
      <section className="section bg-gradient-to-b from-[#0f0a1a] to-[#1a0f2e]">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="card border border-brand-600/20 bg-brand-600/5 text-center">
              <h2 className="font-display font-bold text-white text-2xl mb-4">
                Have an idea? Let&apos;s build it together.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                CAXiE takes on co-development partnerships for software products with proven market demand. If you have a validated idea and need a technical co-founder or development partner, let&apos;s talk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20a%20product%20idea."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Discuss your idea
                </a>
                <Link href="/contact" className="btn-secondary">
                  Send a detailed brief
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
