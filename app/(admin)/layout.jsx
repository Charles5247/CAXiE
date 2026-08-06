import "../globals.css";

export const metadata = {
  title: "Admin | CAXiE Technologies",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-[#05030b] text-white">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.18),_transparent_45%)]">
          <header className="border-b border-white/10 bg-black/20 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
                  CAXiE Admin
                </p>
                <p className="text-xs text-slate-400">
                  Separate secure console
                </p>
              </div>
              <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                Isolated deployment
              </div>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
