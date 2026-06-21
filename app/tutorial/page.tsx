import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Tutorial() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl italic text-ivory sm:text-4xl">
            Tutorial bergambar
          </h1>
          <p className="mt-4 text-ivory/55">
            Belum sempat baca panduan teks? Ikuti video singkat ini untuk
            mengunduh data Instagram-mu dengan benar.
          </p>

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-surface">
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-ivory/30">
                Tempatkan embed video tutorial di sini
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-ivory/55">
            Lebih suka panduan langkah demi langkah dalam teks? Lihat halaman{" "}
            <a href="/how-it-works" className="text-amber underline-offset-2 hover:underline">
              Cara Kerja
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
