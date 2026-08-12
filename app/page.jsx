import Link from "next/link";
import Image from "next/image";
import logoMark from "@/components/ui/logo192.png";
import HeroCarousel from "@/components/ui/HeroCarousel";

export const metadata = {
  title: {
    default:
      "CAXiE Technologies Ltd | AI, Software, Cybersecurity & Digital Transformation",
    template: "%s | CAXiE Technologies",
  },
  description: "CAXiE Technologies delivers integrated ICT solutions...",
  metadataBase: new URL("https://caxietechnologies.com"),
  openGraph: {
    title: "CAXiE Technologies",
    description: "...",
    url: "https://caxietechnologies.com",
    siteName: "CAXiE Technologies",
    images: [{ url: "/preview.png", width: 1200, height: 630 }],
    locale: "en_UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAXiE Technologies",
    images: ["/preview.png"],
  },
};

// Trust indicators
const trustBadges = [
  { label: "Security by design", icon: "🛡️" },
  { label: "Fractional CTO and advisory support", icon: "⚡" },
  { label: "Practical delivery for real business outcomes", icon: "📊" },
  { label: "Kano, Nigeria. Serving clients worldwide", icon: "🌍" },
];

const services = [
  {
    id: "cyber",
    title: "Cybersecurity & Identity Protection",
    description:
      "Threat assessments, security audits, identity management, and hardening for organisations that cannot afford a breach.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    href: "/services#cyber",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    id: "ict",
    title: "ICT Infrastructure",
    description:
      "Network design, deployment, cloud integration, and enterprise systems built to scale with your organisation.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M12 5l7 7-7 7"
        />
      </svg>
    ),
    href: "/services#ict",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    id: "data",
    title: "Data & Intelligence",
    description:
      "Analytics dashboards, business intelligence, and decision-support tools that convert your data into competitive advantage.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    href: "/services#data",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  {
    id: "web",
    title: "Web & Digital Brand",
    description:
      "Full-stack web development, SEO, branding, and digital marketing systems that are visible to search engines and convert visitors.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
        />
      </svg>
    ),
    href: "/services#web",
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/20",
  },
  {
    id: "cto",
    title: "Fractional CTO",
    description:
      "Enterprise-level technical leadership on retainer strategy, vendor management, team oversight, and architecture guidance without a full-time hire.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        />
      </svg>
    ),
    href: "/services#cto",
    color: "text-brand-400",
    bg: "bg-brand-600/10 border-brand-600/20",
  },
  {
    id: "software",
    title: "Software & App Development",
    description:
      "Custom web applications, iOS/Android mobile apps, and desktop software built to your spec with security and maintainability built in from day one.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    href: "/services#software",
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
  },
];

const caseStudyPreview = {
  name: "Dala Orthopedic Hospital",
  category: "Healthcare Digital Transformation",
  description:
    "CAXiE led the digital infrastructure and web presence build for Dala Orthopedic, delivering a secure patient-accessible system that replaced manual workflows.",
  metrics: [
    {
      label: "Patient digital touchpoints",
      value: "↑ Significantly",
      placeholder: true,
    },
    { label: "Security posture", value: "Hardened", placeholder: false },
    { label: "Web presence", value: "Established", placeholder: false },
  ],
  href: "/case-studies/dala-orthopedic",
};

const ctoPreview = {
  name: "3StarData",
  category: "Fractional CTO Engagement",
  description:
    "CAXiE provided fractional CTO support and technical leadership for a growth-stage digital services platform, helping shape roadmap strategy and delivery oversight.",
  engagement: "Active retainer + equity: ongoing",
  href: "/case-studies/3stardata",
};

export default function HomePage() {
  return (
    <div className="bg-[#0f0a1a]">
      {/* ═══════════════════════════════════════════ HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <HeroCarousel className="rounded-none" />
        </div>
        {/* Background gradient */}
        <div
          className="absolute inset-0 z-10 bg-hero-gradient"
          aria-hidden="true"
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-10 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(147,51,234,0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        {/* Glow orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl z-10"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900/30 rounded-full blur-2xl z-10"
          aria-hidden="true"
        />

        <div className="relative z-20 w-[90%] mx-auto h-screen flex items-center px-[10px] sm:px-[15px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Left — headline & CTAs */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-600/15 border border-brand-600/30 rounded-full px-4 py-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-brand-300 text-sm font-medium">
                  IT Consultancy · Kano, Nigeria
                </span>
              </div>

              <h1
                id="hero-heading"
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
              >
                Technology that{" "}
                <span className="gradient-text">builds real businesses</span>
              </h1>

              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-lg">
                CAXiE Technologies Ltd aids ambitious organisations move faster
                with AI, software, cybersecurity, infrastructure, and smart
                digital systems that support real growth.
              </p>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 text-sm text-gray-400"
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Start a Project
                </a>
                <Link href="/services" className="btn-secondary text-base">
                  View Our Services
                  <svg
                    className="w-4 h-4"
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
                </Link>
              </div>
            </div>

            {/* Right — floating metrics card */}
            <div className="lg:flex flex-col gap-4 hidden lg:items-end">
              <div className="card bg-white/5 backdrop-blur-lg border border-white/15 px-5 py-4 rounded-2xl shadow-brand-lg flex items-center justify-between gap-4 relative max-w-xl w-full">
                <div className="flex items-center gap-2.5">
                  <Image
                    src={logoMark}
                    alt="CAXiE Technologies Ltd"
                    width={70}
                    height={70}
                    className="rounded-lg object-contain"
                    priority
                  />
                  <div>
                    <p className="font-display font-semibold text-white text-sm">
                      CAXiE Technologies Ltd
                    </p>
                    <p className="text-brand-400 text-xs">
                      Technology consultancy · Kano, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <p className="text-green-400 font-bold text-sm">Active</p>
                    <p className="text-gray-500 text-xs">CTO Roles</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-sm">&lt;24h</p>
                    <p className="text-gray-500 text-xs">Response</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-sm">6</p>
                    <p className="text-gray-500 text-xs">Services</p>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg whitespace-nowrap">
                  Available for projects
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs animate-bounce">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ SERVICES PREVIEW */}
      <section
        className="section bg-[#0f0a1a]"
        aria-labelledby="services-heading"
      >
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="badge-brand mb-4 inline-block">What We Do</span>
            <h2 id="services-heading" className="section-title">
              Five service lines. One team you can trust.
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Each service is delivered with the same practical discipline
              whether we&apos;re building software, strengthening
              infrastructure, or guiding your technology roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => (
              <Link
                key={svc.id}
                href={svc.href}
                className={`card group cursor-pointer border ${svc.bg} hover:scale-[1.02] transition-transform duration-200`}
                aria-label={`${svc.title} — learn more`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${svc.bg} border ${svc.color}`}
                >
                  <span className={svc.color}>{svc.icon}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-brand-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {svc.description}
                </p>
                <div
                  className={`mt-4 flex items-center gap-1 text-sm font-medium ${svc.color}`}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                </div>
              </Link>
            ))}

            {/* CTA card */}
            <div className="card border border-brand-600/20 bg-brand-600/5 flex flex-col items-center justify-center text-center gap-4 p-8">
              <div className="w-14 h-14 bg-brand-600/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-brand-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-white mb-1">
                  Not sure what you need?
                </p>
                <p className="text-gray-400 text-sm">
                  Tell us about your business challenge .. we&apos;ll recommend
                  the right solution.
                </p>
              </div>
              <a
                href="https://wa.me/2348165443398?text=Hi%20CAXiE%2C%20I%27d%20like%20to%20discuss%20my%20technology%20needs."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Talk to the team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CASE STUDIES PREVIEW */}
      <section
        className="section bg-gradient-to-b from-[#0f0a1a] to-[#1a0f2e]"
        aria-labelledby="cases-heading"
      >
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="badge-brand mb-4 inline-block">Proof of Work</span>
            <h2 id="cases-heading" className="section-title">
              Not claims — evidence.
            </h2>
            <p className="section-subtitle mx-auto text-center">
              Real engagements. Real outcomes. Every case study below reflects
              an active or completed project, not a demo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dala Orthopedic */}
            <div className="card border border-white/10 hover:border-brand-600/30 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/15 border border-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <span className="badge-blue text-xs mb-2 inline-block">
                    Healthcare · Digital Transformation
                  </span>
                  <h3 className="font-display font-bold text-white text-xl group-hover:text-brand-400 transition-colors">
                    Dala Orthopedic Hospital
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {caseStudyPreview.description}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {caseStudyPreview.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-brand-400 font-bold text-lg">
                      {m.value}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
              <Link
                href={caseStudyPreview.href}
                className="btn-secondary text-sm"
              >
                Read Case Study
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </Link>
            </div>

            {/* 3StarData */}
            <div className="card border border-white/10 hover:border-brand-600/30 group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-600/15 border border-brand-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-brand-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="badge-brand text-xs mb-2 inline-block">
                    VTU / Digital Services · Fractional CTO
                  </span>
                  <h3 className="font-display font-bold text-white text-xl group-hover:text-brand-400 transition-colors">
                    3StarData
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {ctoPreview.description}
              </p>
              <div className="bg-brand-600/10 border border-brand-600/20 rounded-xl p-4 mb-6">
                <p className="text-brand-300 text-sm">
                  <strong className="text-white">Engagement model:</strong>{" "}
                  {ctoPreview.engagement}
                </p>
              </div>
              <Link href={ctoPreview.href} className="btn-secondary text-sm">
                View Engagement
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ COMPANY SECTION */}
      <section
        className="section bg-[#1a0f2e]"
        aria-labelledby="company-heading"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="space-y-6">
              <span className="badge-brand inline-block">
                About CAXiE Technologies Ltd
              </span>
              <h2
                id="founder-heading"
                className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight"
              >
                Built on one conviction: world-class delivery is a matter of
                discipline, not geography.
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                CAXiE Technologies Ltd brings together software engineering, AI
                enablement, infrastructure expertise, and technology leadership
                for organisations that need dependable delivery and clear
                strategic guidance.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our fractional CTO and advisory engagements reflect the same
                commitment: practical leadership, close collaboration, and
                measurable progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/about" className="btn-primary">
                  About CAXiE Technologies Ltd
                </Link>
                <a
                  href="https://x.com/iamxavi_too"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Follow us on X
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Photo card */}
            <div className="relative">
              <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="aspect-[4/5] bg-gradient-to-br from-brand-800 to-brand-950 rounded-3xl overflow-hidden shadow-brand-lg">
                  <Image
                    src="/founder.JPG"
                    alt="Founder|CEO CAXiE Technologies Ltd"
                    fill
                    className="object-cover"
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
                {/* Overlay card */}
                <div className="absolute -bottom-6 -left-6 bg-[#0f0a1a] border border-white/15 rounded-2xl p-4 shadow-brand max-w-[220px]">
                  <p className="font-display font-bold text-white text-sm">
                    Ekechukwuemeka Charles Xavier
                  </p>
                  <p className="text-brand-400 text-xs mt-0.5">
                    Founder, CEO, Lead Tech consultant, Tutor, Network &
                    Software Engineer
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Available for fractional engagements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ TEACHING SECTION */}
      <section
        className="section bg-gradient-to-b from-[#1a0f2e] to-[#0f0a1a]"
        aria-labelledby="teaching-heading"
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="card border border-brand-600/20 bg-brand-600/5 p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-brand-400">
                      Beginner
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      friendly entry point
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-brand-400">
                      Web Dev
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      core curriculum
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-brand-400">
                      1-on-1
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      mentorship available
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-brand-400">
                      Kano
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      + remote options
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <span className="badge-brand inline-block">
                Community Investment
              </span>
              <h2
                id="teaching-heading"
                className="font-display font-bold text-3xl sm:text-4xl text-white"
              >
                We&apos;re also building the next generation of Nigerian tech
                talent.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                CAXiE runs beginner web development classes and mentorship
                programs not as a side project, but as a core part of how we
                invest in the Nigerian tech ecosystem. Teaching is how we build
                trust, reputation, and community.
              </p>
              <Link href="/teaching" className="btn-primary">
                Learn About Our Classes
                <svg
                  className="w-4 h-4"
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ TRUST SIGNALS */}
      <section className="section bg-[#0f0a1a]" aria-labelledby="trust-heading">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 id="trust-heading" className="section-title">
              Why work with CAXiE?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛡️",
                title: "Cybersecurity-First",
                desc: "Every engagement from a web platform to an infrastructure project is designed with resilience built in from the start.",
              },
              {
                icon: "📋",
                title: "Transparent Process",
                desc: "You know what we're building, when we're building it, and what it costs at every stage.",
              },
              {
                icon: "🎯",
                title: "Direct Accountability",
                desc: "We stay close to the work and take ownership of outcomes rather than handing projects off and disappearing into layers.",
              },
              {
                icon: "📈",
                title: "Results, Not Hours",
                desc: "We scope projects around outcomes not time-tracked deliverables that obscure what you're actually paying for.",
              },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-4xl mb-4" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/trust-security" className="btn-ghost text-sm">
              Read our full security & trust statement
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ FINAL CTA */}
      <section
        className="section bg-gradient-to-br from-brand-900 via-brand-800 to-[#1a0f2e]"
        aria-labelledby="cta-heading"
      >
        <div className="container-max">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2
              id="cta-heading"
              className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight"
            >
              Ready to work with a technology partner who takes your systems as
              seriously as you do?
            </h2>
            <p className="text-gray-300 text-lg">
              Tell us about your project. Response within 24 hours. No hard sell
              just a straight conversation about what you need and whether CAXiE
              is the right fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/2348165443398?text=Hi%20CAXiE%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base w-full sm:w-auto justify-center"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp Us — Start Here
              </a>
              <Link
                href="/contact"
                className="btn-secondary text-base w-full sm:w-auto justify-center"
              >
                Send a Project Brief
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              +234 816 544 3398 · contact@caxietechnologies.com · Kano, Nigeria
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function MetricRow({ label, value, positive }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span
        className={`font-semibold text-sm ${positive ? "text-green-400" : "text-gray-300"}`}
      >
        {value}
      </span>
    </div>
  );
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
