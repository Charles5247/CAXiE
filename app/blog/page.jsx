import Link from 'next/link';
import { createServerClient } from '@/lib/supabase-server';

export const metadata = {
  title: 'Blog & Insights — Tech Strategy, Cybersecurity & Digital Nigeria',
  description:
    'CAXiE Technologies blog: practical insights on cybersecurity, digital transformation, ICT infrastructure, and building technology businesses in Nigeria.',
  openGraph: {
    title: 'CAXiE Technologies Blog & Insights',
    description: 'Cybersecurity, data intelligence, web strategy, and tech leadership insights from the CAXiE Technologies team.',
    url: 'https://caxietechnologies.com/blog',
  },
};

const categories = ['All', 'Cybersecurity', 'ICT Infrastructure', 'Data & Analytics', 'Web & Digital', 'Fractional CTO', 'Tech in Nigeria'];

// Fallback posts if Supabase is not configured
const fallbackPosts = [
  {
    id: 1,
    title: 'Why your Nigerian business website is invisible to Google — and how to fix it',
    excerpt: 'Most Nigerian SME websites are built with client-side-only JavaScript frameworks. The result: Google\'s crawler visits your site and finds an empty shell. Here\'s what\'s happening and what a properly server-rendered site looks like.',
    category: 'Web & Digital',
    date: '2025-07-15',
    slug: 'nigeria-website-seo-invisibility',
    image_url: null,
  },
  {
    id: 2,
    title: 'The fractional CTO model: why it works for growth-stage Nigerian companies',
    excerpt: 'Full-time CTOs are expensive. Junior developers making architectural decisions are more expensive. There\'s a third option — and it\'s gaining traction with the companies that grow fastest.',
    category: 'Fractional CTO',
    date: '2025-07-01',
    slug: 'fractional-cto-nigeria',
    image_url: null,
  },
  {
    id: 3,
    title: 'Five cybersecurity mistakes Nigerian SMEs make (and what they cost)',
    excerpt: 'From weak password policies to unencrypted records, the same five mistakes appear in almost every security audit we run. This is what they look like, and the actual risk they carry.',
    category: 'Cybersecurity',
    date: '2025-06-18',
    slug: 'nigerian-sme-cybersecurity-mistakes',
    image_url: null,
  },
  {
    id: 4,
    title: 'Building a data strategy when your data is in spreadsheets',
    excerpt: 'You don\'t need a data warehouse to start making data-driven decisions. Here\'s a practical framework for organisations that are operationally data-rich but analytically data-dark.',
    category: 'Data & Analytics',
    date: '2025-06-05',
    slug: 'data-strategy-spreadsheets',
    image_url: null,
  },
];

async function getPosts() {
  try {
    const supabase = createServerClient();
    if (!supabase) return fallbackPosts;
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });
    if (error || !data?.length) return fallbackPosts;
    return data;
  } catch {
    return fallbackPosts;
  }
}

export const revalidate = 3600; // ISR — revalidate every hour

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-[#0f0a1a]">
      {/* HEADER */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-[#0f0a1a] to-[#1a0f2e]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <span className="badge-brand inline-block mb-4">Blog & Insights</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white max-w-2xl leading-tight">
            Practical insights,<br />
            <span className="gradient-text">not thought leadership fluff.</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl leading-relaxed">
            Cybersecurity, digital transformation, data intelligence, and building technology businesses in Nigeria. Written by the same team that delivers these services — not a content agency.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER — client-side, placeholder visual */}
      <div className="bg-[#0f0a1a]/95 backdrop-blur-xl border-b border-white/10 sticky top-16 z-40">
        <div className="container-max px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-2 py-3 min-w-max">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                  cat === 'All'
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS GRID */}
      <section className="section" aria-labelledby="posts-heading">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <h2 id="posts-heading" className="sr-only">Blog posts</h2>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-6">Articles coming soon. Follow Xavier on X for previews.</p>
              <a href="https://x.com/iamxavi_too" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                @iamxavi_too on X
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-20 card border border-brand-600/20 bg-brand-600/5 p-8 text-center max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Get new articles when they drop
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Follow Xavier on X or connect on LinkedIn — content drops there first.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://x.com/iamxavi_too"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Follow @iamxavi_too on X
              </a>
              <a
                href="https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <article className="card flex flex-col group hover:border-brand-600/30 transition-all duration-300">
      {/* Image */}
      {post.image_url ? (
        <div className="aspect-video rounded-xl overflow-hidden mb-4 -mx-2 -mt-2">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-brand-900/40 to-brand-600/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-brand-600/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        {post.category && <span className="badge-brand text-xs">{post.category}</span>}
        {formattedDate && <span className="text-gray-500 text-xs">{formattedDate}</span>}
      </div>

      {/* Content */}
      <h2 className="font-display font-bold text-white text-lg mb-2 group-hover:text-brand-400 transition-colors leading-tight">
        {post.title}
      </h2>
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
        {post.excerpt || (post.full_text || '').slice(0, 160) + '...'}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1 text-brand-400 text-sm font-medium group-hover:gap-2 transition-all">
        Read article
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* JSON-LD for each post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt || '',
            datePublished: post.date,
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
          }),
        }}
      />
    </article>
  );
}
