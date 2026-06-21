import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const steps = [
  {
    title: "Buka pengaturan Instagram",
    body: "Di aplikasi Instagram, masuk ke Profil → Menu (☰) → Pusat Akun → Informasimu dan izin.",
  },
  {
    title: "Unduh data kamu",
    body: "Pilih 'Unduh informasi kamu', pilih akun Instagram-mu, lalu pilih format JSON (bukan HTML) agar bisa diproses.",
  },
  {
    title: "Pilih rentang yang mencakup follow request",
    body: "Pilih kategori 'Followers and following' atau seluruh data jika kamu tidak yakin kategori mana yang relevan.",
  },
  {
    title: "Tunggu email dari Instagram",
    body: "Instagram akan mengirim file ZIP melalui email atau notifikasi dalam aplikasi, biasanya dalam beberapa menit hingga 48 jam.",
  },
  {
    title: "Upload ZIP ke Pending",
    body: "Kembali ke halaman utama, seret file ZIP yang kamu unduh tadi, dan biarkan kami membaca daftar follow request yang masih menunggu.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl italic text-ivory sm:text-4xl">
            Cara kerjanya
          </h1>
          <p className="mt-4 text-ivory/55">
            Lima langkah singkat untuk mendapatkan file yang kami butuhkan —
            langsung dari Instagram, bukan dari kami.
          </p>

          <ol className="mt-12 space-y-0">
            {steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                {i !== steps.length - 1 && (
                  <span className="waiting-line absolute left-[15px] top-8 bottom-0" />
                )}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber/40 font-mono text-xs text-amber">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg italic text-ivory">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ivory/55">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="/#upload"
            className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 text-sm font-medium text-ink transition hover:bg-amber"
          >
            Sudah punya filenya? Upload sekarang
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
