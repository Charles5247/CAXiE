import "./globals.css";
import { headers } from "next/headers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/ui/AIChatbot";
import MainContent from "@/components/layout/MainContent";
import { SidebarProvider } from "@/lib/SidebarContext";

export const metadata = {
  metadataBase: new URL("https://caxietechnologies.com"),
  title: {
    default: "CAXiE Technologies | Nigerian IT Consultancy — Kano, Nigeria",
    template: "%s | CAXiE Technologies",
  },
  description:
    "CAXiE Technologies is a Nigerian technology consultancy delivering AI, software, cybersecurity, data intelligence, infrastructure, and fractional CTO services from Kano to the world.",
  keywords: [
    "CAXiE Technologies",
    "technology consultancy Nigeria",
    "AI consultancy Nigeria",
    "software development Kano",
    "fractional CTO Nigeria",
    "data analytics Nigeria",
    "ICT infrastructure Nigeria",
    "digital transformation Nigeria",
    "tech company Kano",
    "CAXiE Technologies Ltd",
  ],
  authors: [
    { name: "CAXiE Technologies", url: "https://caxietechnologies.com/about" },
  ],
  creator: "CAXiE Technologies",
  publisher: "CAXiE Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    alternateLocale: ["en_GB", "en_US"],
    siteName: "CAXiE Technologies",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "CAXiE Technologies — Nigerian IT Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iamxavi_too",
    site: "@iamxavi_too",
    images: ["/preview.png"],
  },
  verification: {
    google: "LsLbES2ZpmBkQ62i4pOx3dnh5qnid4gPuxRXNqKVDQQ",
    other: {
      "msvalidate.01": "F26B8CAD5222DB5901A44F320D45DE0B",
    },
  },
  alternates: {
    canonical: "https://caxietechnologies.com",
    languages: {
      "en-NG": "https://caxietechnologies.com",
      en: "https://caxietechnologies.com",
    },
  },
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const host = (
    headerList.get("x-forwarded-host") ||
    headerList.get("host") ||
    ""
  ).toLowerCase();
  const pathname = headerList.get("x-pathname") || "";
  const isAdminApp =
    process.env.APP_MODE === "admin" ||
    host === "admin-caxie.onrender.com" ||
    host.startsWith("admin.") ||
    host === "admin" ||
    pathname.startsWith("/admin");
  const showPublicChrome = !isAdminApp;

  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Geo meta for local SEO — Kano, Nigeria */}
        <meta name="geo.region" content="NG-KN" />
        <meta name="geo.placename" content="Kano, Nigeria" />
        <meta name="geo.position" content="12.0022;8.5920" />
        <meta name="ICBM" content="12.0022,8.5920" />
        {/* hreflang */}
        <link
          rel="alternate"
          hrefLang="en-ng"
          href="https://caxietechnologies.com"
        />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://caxietechnologies.com"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://caxietechnologies.com"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        {/* Theme color */}
        <meta name="theme-color" content="#9333ea" />
        {/* JSON-LD — Organization + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": [
                    "Organization",
                    "LocalBusiness",
                    "ProfessionalService",
                  ],
                  "@id": "https://caxietechnologies.com/#organization",
                  name: "CAXiE Technologies",
                  alternateName: ["CAXiE", "Caxie Tech"],
                  url: "https://caxietechnologies.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://caxietechnologies.com/logo.png",
                  },
                  image: "https://caxietechnologies.com/preview.png",
                  description:
                    "Nigerian technology consultancy delivering AI, software, cybersecurity, data intelligence, infrastructure, and fractional CTO services.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Kano",
                    addressRegion: "Kano State",
                    addressCountry: "NG",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 12.0022,
                    longitude: 8.592,
                  },
                  telephone: "+2348165443398",
                  email: "contact@caxietechnologies.com",
                  sameAs: [
                    "https://x.com/iamxavi_too",
                    "https://www.instagram.com/iamxavi_too/",
                    "https://github.com/Charles5247",
                    "https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/",
                  ],
                  founder: {
                    "@type": "Person",
                    "@id": "https://caxietechnologies.com/about#team",
                    name: "CAXiE Technologies Leadership",
                    jobTitle: "Technology Leadership",
                    sameAs: [
                      "https://x.com/iamxavi_too",
                      "https://www.instagram.com/iamxavi_too/",
                    ],
                  },
                  areaServed: ["NG", "Worldwide"],
                  priceRange: "₦₦–₦₦₦₦",
                  openingHours: "Mo-Fr 09:00-17:00",
                  serviceType: [
                    "Cybersecurity",
                    "ICT Infrastructure",
                    "Data Analytics",
                    "Web Development",
                    "Fractional CTO",
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://caxietechnologies.com/about#team",
                  name: "CAXiE Technologies Leadership",
                  jobTitle: "Technology Leadership",
                  worksFor: {
                    "@id": "https://caxietechnologies.com/#organization",
                  },
                  url: "https://caxietechnologies.com/about",
                  sameAs: [
                    "https://x.com/iamxavi_too",
                    "https://www.instagram.com/iamxavi_too/",
                    "https://www.linkedin.com/in/charles-xavier-ekechukwuemeka-01185a1a5/",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://caxietechnologies.com/#website",
                  url: "https://caxietechnologies.com",
                  name: "CAXiE Technologies",
                  publisher: {
                    "@id": "https://caxietechnologies.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SidebarProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-600 text-white px-4 py-2 rounded z-[9999]"
          >
            Skip to main content
          </a>
          {showPublicChrome ? (
            <>
              <Navbar />
              <MainContent footer={<Footer />} chatbot={<AIChatbot />}>
                {children}
              </MainContent>
            </>
          ) : (
            children
          )}
        </SidebarProvider>
      </body>
    </html>
  );
}
