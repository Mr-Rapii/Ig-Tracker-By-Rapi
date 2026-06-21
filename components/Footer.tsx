import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <span className="font-display text-lg text-ivory">
              Pending<span className="text-amber">.</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/50">
              Alat pihak ketiga untuk membaca data ekspor Instagram-mu sendiri.
              Tidak berafiliasi dengan, didukung, atau disponsori oleh
              Instagram atau Meta.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ivory/40">
              Navigasi
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ivory/60">
              <li><Link href="/how-it-works" className="hover:text-ivory">Cara Kerja</Link></li>
              <li><Link href="/tutorial" className="hover:text-ivory">Tutorial</Link></li>
              <li><Link href="/faq" className="hover:text-ivory">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ivory/40">
              Legal
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ivory/60">
              <li><Link href="/privacy" className="hover:text-ivory">Kebijakan Privasi</Link></li>
              <li><Link href="/terms" className="hover:text-ivory">Syarat & Ketentuan</Link></li>
              <li><Link href="/cookies" className="hover:text-ivory">Kebijakan Cookie</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/5 pt-6 text-xs text-ivory/30">
          © {new Date().getFullYear()} Pending. Data kamu diproses sementara di
          memori server dan tidak disimpan setelah hasil ditampilkan.
        </p>
      </div>
    </footer>
  );
}
