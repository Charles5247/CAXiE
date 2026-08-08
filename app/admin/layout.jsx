export const metadata = {
  title: "Admin — CAXiE Technologies Ltd CMS",
  description: "Content management system for CAXiE Technologies Ltd.",
  robots: {
    index: false,
    follow: false,
    noindex: true,
    nosnippet: true,
    noarchive: true,
  },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-[#080510]">{children}</div>;
}
