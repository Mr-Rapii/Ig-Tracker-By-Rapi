import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadArea from "@/components/UploadArea";

const ghostNames = ["rara_", "dimasp", "thejourno", "kiki.s", "alif_w", "nrl.dev"];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-ivory/50">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-coral" />
                Tidak terafiliasi dengan Instagram
              </p>
              <h1 className="font-display text-4xl italic leading-[1.1] text-ivory sm:text-5xl lg:text-6xl">
                Siapa yang belum
                <br />
                menjawab <span className="text-amber">follow request</span>-mu?
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/55">
                Upload file ZIP dari data Instagram-mu. Dalam beberapa detik,
                kamu akan melihat daftar akun yang masih membiarkan
                permintaanmu menunggu.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#upload"
                  className="rounded-full bg-coral px-7 py-3.5 text-center text-sm font-medium text-ink transition hover:bg-amber"
                >
                  Pilih file ZIP
                </a>
                <a
                  href="/how-it-works"
                  className="text-center text-sm text-ivory/50 underline-offset-4 hover:text-ivory hover:underline"
                >
                  Bagaimana cara mengunduhnya?
                </a>
              </div>
            </div>

            {/* Signature element: the waiting line */}
            <div className="relative mx-auto hidden w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-6 sm:block">
              <p className="mb-4 text-xs uppercase tracking-wider text-ivory/30">
                Sedang menunggu
              </p>
              <div className="flex gap-4">
                <div className="waiting-line shrink-0" />
                <ul className="flex-1 space-y-4">
                  {ghostNames.map((name, i) => (
                    <li key={name} className="flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-amber animate-pulseDot"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                      <span className="font-mono text-sm text-ivory/70">
                        @{name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-sm italic text-lavender">
              Langkah 1 dari 1
            </p>
            <h2 className="mt-2 font-display text-2xl italic text-ivory">
              Upload data Instagram-mu
            </h2>
          </div>
          <div className="mt-10">
            <UploadArea />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              {
                title: "Diproses di memori",
                body: "File kamu dibaca di server hanya untuk diekstrak datanya, lalu langsung dibuang. Tidak ada yang disimpan permanen.",
              },
              {
                title: "Tanpa login Instagram",
                body: "Kami tidak pernah meminta username atau password Instagram-mu. Cukup file data resmi yang kamu unduh sendiri.",
              },
              {
                title: "Hasil instan",
                body: "Begitu file selesai diekstrak, daftar akun yang pending langsung tampil dan bisa diunduh sebagai CSV.",
              },
            ].map((item) => (
              <div key={item.title}>
                <p className="font-display text-lg italic text-amber">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/55">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
