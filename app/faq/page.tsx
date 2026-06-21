import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "Apakah kamu menyimpan data Instagram saya?",
    a: "Tidak. File ZIP yang kamu unggah diproses sepenuhnya di memori server untuk diekstrak datanya, lalu langsung dibuang setelah hasil dikirim ke browsermu. Tidak ada salinan yang disimpan di disk atau database.",
  },
  {
    q: "Apakah kalian butuh password Instagram saya?",
    a: "Tidak pernah. Kami hanya membaca file data resmi yang sudah kamu unduh sendiri dari pengaturan akun Instagram. Kami tidak pernah meminta kredensial login.",
  },
  {
    q: "Kenapa harus format JSON, bukan HTML?",
    a: "File JSON memiliki struktur data yang konsisten dan bisa dibaca otomatis oleh sistem kami. File HTML dirancang untuk tampilan visual manusia, bukan untuk diproses program.",
  },
  {
    q: "Apakah ini resmi dari Instagram?",
    a: "Bukan. Pending adalah alat pihak ketiga yang independen. Kami tidak berafiliasi dengan, didukung, atau disponsori oleh Instagram maupun Meta Platforms, Inc.",
  },
  {
    q: "Mengapa beberapa akun yang saya kira pending tidak muncul?",
    a: "Kemungkinan akun tersebut sudah menerima permintaanmu, kamu sudah membatalkan permintaan tersebut, atau struktur file ekspormu sedikit berbeda dari yang kami kenali. Coba unduh ulang data terbarumu dari Instagram.",
  },
  {
    q: "Berapa lama proses upload dan ekstraksi?",
    a: "Umumnya hanya beberapa detik, tergantung ukuran file ZIP-mu. Batas maksimal ukuran file adalah 50MB.",
  },
];

export default function FAQ() {
  return (
    <>
      <Navbar />
      <main className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl italic text-ivory sm:text-4xl">
            Pertanyaan umum
          </h1>
          <div className="mt-10 divide-y divide-white/5 border-t border-white/5">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-ivory">
                  <span className="pr-4 font-medium">{item.q}</span>
                  <span className="shrink-0 text-amber transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ivory/55">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
