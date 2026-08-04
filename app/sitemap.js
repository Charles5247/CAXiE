export default function sitemap() {
  const base = 'https://caxietechnologies.com';
  const now = new Date().toISOString();

  const routes = [
    { url: base, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/about`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/pricing`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/dala-orthopedic`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/case-studies/3stardata`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/trust-security`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/teaching`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/cookies`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/do-not-sell`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
