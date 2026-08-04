import Link from 'next/link';
export const metadata = { title: 'Cookie Policy — CAXiE Technologies', description: 'Cookie Policy for caxietechnologies.com' };
export default function CookiesPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 to-[#0f0a1a]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link>
            <span className="text-gray-600 text-sm">/</span>
            <span className="text-gray-300 text-sm">Cookie Policy</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2">Cookie Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2024</p>
          <div className="prose-brand space-y-8">
            {[
              { title: '1. What Are Cookies?', body: 'Cookies are small text files stored on your device by websites you visit. They help websites remember preferences and improve user experience.' },
              { title: '2. How We Use Cookies', body: 'caxietechnologies.com uses minimal cookies — primarily for essential site functionality (e.g. form CSRF protection) and basic anonymous analytics. No personally identifiable information is stored in cookies.' },
              { title: '3. Types of Cookies', body: 'Essential cookies: required for the site to function correctly. Analytics cookies (if enabled): help us understand aggregate visitor behaviour to improve the site. No advertising or third-party tracking cookies are used by default.' },
              { title: '4. Managing Cookies', body: 'You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect site functionality, particularly contact form submission.' },
              { title: '5. Changes', body: 'This policy may be updated to reflect changes in our cookie usage. The date above reflects the most recent revision.' },
              { title: '6. Contact', body: 'Cookie questions: contact@caxietechnologies.com' },
            ].map((s) => (
              <div key={s.title}>
                <h2 className="font-display font-semibold text-white text-xl mb-3">{s.title}</h2>
                <p className="text-gray-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="brand-divider mt-12" />
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} CAXiE Technologies. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
