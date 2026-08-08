import Link from "next/link";
export const metadata = {
  title: "Terms of Use — CAXiE Technologies Ltd",
  description: "Terms of Use for caxietechnologies.com",
};
export default function TermsPage() {
  return (
    <div className="bg-[#0f0a1a]">
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 to-[#0f0a1a]" />
        <div className="relative container-max px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              Home
            </Link>
            <span className="text-gray-600 text-sm">/</span>
            <span className="text-gray-300 text-sm">Terms of Use</span>
          </div>
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Terms of Use
          </h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2024</p>
          <div className="prose-brand space-y-8">
            {[
              {
                title: "1. Acceptance of Terms",
                body: "By accessing and using caxietechnologies.com, you agree to comply with and be bound by these Terms of Use. If you do not agree, please do not use this site.",
              },
              {
                title: "2. Intellectual Property",
                body: "All content on this site — including text, images, graphics, code, and design — is the property of CAXiE Technologies Ltd unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit written permission.",
              },
              {
                title: "3. User Responsibilities",
                body: "You agree to use this website lawfully and respectfully. Do not attempt to disrupt, attack, scrape abusively, or misuse the site or its infrastructure.",
              },
              {
                title: "4. Service Descriptions",
                body: "Content describing services, pricing, and capabilities on this website is for general information purposes. Formal engagements are governed by separate written proposals and contracts.",
              },
              {
                title: "5. Disclaimers",
                body: 'This website is provided "as is" without warranties of any kind. CAXiE Technologies Ltd is not liable for any direct or indirect damages arising from your use of this site or reliance on its content.',
              },
              {
                title: "6. Governing Law",
                body: "These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved under Nigerian jurisdiction.",
              },
              {
                title: "7. Changes to Terms",
                body: 'We reserve the right to update these Terms at any time. The "last updated" date will reflect changes. Continued use of the site constitutes acceptance.',
              },
              {
                title: "8. Contact",
                body: "Questions about these Terms: contact@caxietechnologies.com",
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
