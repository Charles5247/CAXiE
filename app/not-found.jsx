import Link from "next/link";

export const metadata = {
  title: "Page Not Found — CAXiE Technologies Ltd",
};

export default function NotFound() {
  return (
    <div className="bg-[#0f0a1a] min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold gradient-text mb-6">
          404
        </div>
        <h1 className="font-display font-bold text-2xl text-white mb-3">
          Page not found
        </h1>
        <p className="text-gray-400 mb-8">
          This page doesn&apos;t exist or may have moved. If you followed a link
          from the old Netlify site, please check the navigation above — all
          pages have been migrated to the new URL structure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go to Homepage
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
