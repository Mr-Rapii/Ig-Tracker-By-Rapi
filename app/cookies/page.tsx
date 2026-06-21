import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Cookies() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl italic text-ivory">
            Kebijakan Cookie
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-ivory/60">
            <p>
              Situs ini dapat menggunakan cookie esensial untuk menjaga
              fungsi dasar (seperti preferensi tema), serta cookie analitik
              pihak ketiga untuk memahami pola penggunaan secara agregat.
            </p>
            <p>
              Kami tidak menggunakan cookie untuk melacak aktivitas
              Instagram-mu di luar situs ini. Kamu dapat menonaktifkan
              cookie non-esensial melalui pengaturan browser atau banner
              persetujuan cookie saat pertama kali mengunjungi situs.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
