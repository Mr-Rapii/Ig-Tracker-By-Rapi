import Link from "next/link";

const navLinks = [
  { href: "/#upload", label: "Cek Pending" },
  { href: "/not-following-back", label: "Tidak Follow Balik" },
  { href: "/how-it-works", label: "Cara Kerja" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-coral" />
          </span>
          <span className="font-display text-lg tracking-tight text-ivory">
            Pending<span className="text-amber">.</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ivory/70 transition hover:text-ivory"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#upload"
          className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-ink transition hover:bg-amber"
        >
          Cek sekarang
        </Link>
      </nav>
    </header>
  );
}
