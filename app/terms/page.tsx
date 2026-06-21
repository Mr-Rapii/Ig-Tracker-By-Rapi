import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl italic text-ivory">
            Syarat & Ketentuan
          </h1>
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-ivory/60">
            <p>
              Pending adalah alat pihak ketiga yang independen dan tidak
              berafiliasi dengan, didukung, atau disponsori oleh Instagram
              maupun Meta Platforms, Inc. "Instagram" adalah merek dagang
              milik Meta Platforms, Inc.
            </p>
            <p>
              Dengan menggunakan situs ini, kamu menyatakan bahwa file yang
              kamu unggah adalah data ekspor akun Instagram milikmu sendiri,
              dan kamu memiliki hak untuk memprosesnya.
            </p>
            <p>
              Layanan ini disediakan "sebagaimana adanya" tanpa jaminan
              apa pun. Keakuratan hasil bergantung pada struktur file yang
              diberikan oleh Instagram dan dapat berubah sewaktu-waktu
              mengikuti perubahan format ekspor data dari pihak Instagram.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
