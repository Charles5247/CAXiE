import Link from 'next/link';
export const metadata = { title: 'Do Not Sell My Personal Information — CAXiE Technologies' };
export default function DoNotSellPage() {
  return (
    <div className="bg-[#0f0a1a] pt-16">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 to-[#0f0a1a]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link>
            <span className="text-gray-600 text-sm">/</span>
            <span className="text-gray-300 text-sm">Do Not Sell My Information</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2">Do Not Sell My Personal Information</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2024</p>
          <div className="prose-brand space-y-8">
            {[
              { title: '1. Our Position', body: 'CAXiE Technologies does not sell, rent, or transfer your personal information to third parties for monetary or other valuable consideration. This page exists to confirm that position and provide a formal mechanism for any requests under applicable privacy laws.' },
              { title: '2. What "Sell" Means', body: 'For the purposes of this notice, "sell" means sharing, disclosing, or transferring your personal information to another party for monetary or other valuable consideration. We do not engage in this practice.' },
              { title: '3. Your Rights', body: 'Under international privacy laws including GDPR and applicable Nigerian law (NDPR), you have the right to request confirmation that your data has not been sold, and to request deletion of your personal data from our systems.' },
              { title: '4. How to Exercise Your Rights', body: 'Contact us at contact@caxietechnologies.com with the subject line "Privacy Request". We will respond within 30 days.' },
              { title: '5. Updates', body: 'This notice may be updated periodically. The "last updated" date above reflects the most recent revision.' },
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
