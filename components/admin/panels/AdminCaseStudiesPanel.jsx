'use client';

const caseStudies = [
  { id: 'dala-orthopedic', name: 'Dala Orthopedic Hospital', status: 'Published', href: '/case-studies/dala-orthopedic' },
  { id: '3stardata', name: '3StarData', status: 'Published', href: '/case-studies/3stardata' },
];

export default function AdminCaseStudiesPanel() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display font-bold text-white text-lg">Case Studies</h2>
        <p className="text-gray-500 text-sm">{caseStudies.length} case studies — managed as page files</p>
      </div>

      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-4 py-3 text-yellow-400 text-sm">
        <p className="font-medium mb-1">File-based content</p>
        <p className="text-yellow-500/80 text-xs leading-relaxed">
          Case studies are currently stored as Next.js page files (<code className="text-yellow-300">app/case-studies/*/page.jsx</code>). To edit their content, update the relevant page file and redeploy. To migrate to a database-driven system, create a <code className="text-yellow-300">case_studies</code> table in Supabase and update the page to use <code className="text-yellow-300">createServerClient()</code>.
        </p>
      </div>

      <div className="space-y-3">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-white text-sm">{cs.name}</h3>
              <p className="text-gray-500 text-xs mt-0.5">Route: {cs.href}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">{cs.status}</span>
              <a
                href={cs.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                View ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-4">
        <h3 className="font-semibold text-brand-300 text-sm mb-2">Adding a new case study</h3>
        <ol className="text-gray-400 text-xs space-y-1.5 leading-relaxed list-decimal list-inside">
          <li>Create <code className="text-brand-300">app/case-studies/[client-slug]/page.jsx</code></li>
          <li>Follow the pattern in <code className="text-brand-300">app/case-studies/dala-orthopedic/page.jsx</code></li>
          <li>Add the route to <code className="text-brand-300">app/sitemap.js</code></li>
          <li>Link from <code className="text-brand-300">components/layout/Navbar.jsx</code> and Footer if needed</li>
          <li>Redeploy — the new page is statically generated at build time</li>
        </ol>
      </div>
    </div>
  );
}
