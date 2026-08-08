import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — CAXiE Technologies Ltd",
  description:
    "Privacy Policy for CAXiE Technologies Ltd — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0f0a1a]">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 to-[#0f0a1a]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-300 text-sm">Privacy Policy</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2024</p>

          <div className="prose-brand space-y-8">
            {[
              {
                title: "1. Information Collection",
                body: "This website may collect basic information (such as name, email, and message) when you contact us through the contact form. No sensitive personal data is collected without your explicit consent. Supabase is used for dynamic content storage where applicable.",
              },
              {
                title: "2. Use of Information",
                body: "Your information is used solely to respond to your enquiries or improve the website experience. Your data is never sold, rented, or shared with third parties for marketing purposes.",
              },
              {
                title: "3. Cookies",
                body: "This site may use cookies for basic functionality and analytics. You can disable cookies through your browser settings. Essential cookies required for the site to function correctly cannot be disabled through browser settings alone.",
              },
              {
                title: "4. Data Storage",
                body: "Contact form submissions are processed via Formspree and stored per their privacy policy. Dynamic site content is stored in Supabase (Postgres) with row-level security enabled. We do not store sensitive financial or health information through this website.",
              },
              {
                title: "5. Third-Party Links",
                body: "This website contains links to external sites including GitHub, LinkedIn, X, Instagram, and WhatsApp. CAXiE Technologies Ltd is not responsible for the privacy practices or content of those external sites.",
              },
              {
                title: "6. Your Rights",
                body: "You may request to access, correct, or delete your personal information by contacting us at contact@caxietechnologies.com. We will respond within 30 days. For Nigerian residents, this policy aligns with the Nigerian Data Protection Regulation (NDPR).",
              },
              {
                title: "7. Data Retention",
                body: "Contact form submissions are retained for a maximum of 12 months unless an ongoing engagement requires longer retention. You may request deletion at any time.",
              },
              {
                title: "8. Changes to This Policy",
                body: 'This policy may be updated periodically. The "last updated" date at the top of this page will reflect any changes. Continued use of the site after changes constitutes acceptance of the revised policy.',
              },
              {
                title: "9. Contact",
                body: "For privacy-related enquiries, email contact@caxietechnologies.com or call +234 816 544 3398.",
              },
            ].map((s) => (
              <div key={s.title}>
                <h2 className="font-display font-semibold text-white text-xl mb-3">
                  {s.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="brand-divider mt-12" />
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CAXiE Technologies Ltd. All rights
            reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
