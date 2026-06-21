import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl prose-invert">
          <h1 className="font-display text-3xl italic text-ivory">
            Kebijakan Privasi
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-ivory/60">
            <p>
              Pending memproses file ZIP yang kamu unggah sepenuhnya di
              memori server (in-memory), khusus untuk mengekstrak daftar
              follow request yang masih pending. File tidak pernah ditulis
              ke disk permanen dan dibuang otomatis setelah hasil dikirim
              ke browsermu dalam satu sesi permintaan.
            </p>
            <p>
              Kami tidak meminta atau menyimpan username dan password
              Instagram-mu. Satu-satunya data yang kami proses adalah file
              ekspor data resmi yang kamu unduh sendiri dari pengaturan
              akun Instagram-mu.
            </p>
            <p>
              Kami dapat menggunakan layanan analitik pihak ketiga untuk
              memahami penggunaan situs secara agregat dan anonim. Kamu
              dapat mengatur preferensi cookie melalui banner persetujuan
              saat pertama kali mengunjungi situs.
            </p>
            <p>
              Jika kamu memiliki pertanyaan tentang kebijakan ini, silakan
              hubungi kami melalui kanal kontak yang tersedia di situs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
