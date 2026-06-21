import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFollowingBackArea from "@/components/NotFollowingBackArea";

export default function NotFollowingBack() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1 text-xs text-ivory/50">
              <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-coral" />
              Tidak terafiliasi dengan Instagram
            </p>
            <h1 className="font-display text-4xl italic leading-[1.1] text-ivory sm:text-5xl">
              Siapa yang kamu follow,
              <br />
              tapi <span className="text-amber">tidak follow balik?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ivory/55">
              Upload file ZIP data Instagram-mu yang sama. Kami bandingkan daftar following dan followers-mu secara otomatis.
            </p>
          </div>
        </section>

        <section className="border-t border-white/5 bg-surface px-5 py-16 sm:px-8">
          <NotFollowingBackArea />
        </section>
      </main>
      <Footer />
    </>
  );
}
