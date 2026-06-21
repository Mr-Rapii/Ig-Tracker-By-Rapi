import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pending — Lihat siapa yang belum menerima follow request-mu",
  description:
    "Upload data Instagram-mu dan temukan akun yang belum merespons follow request-mu. Diproses sepenuhnya di memori, tidak disimpan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-ivory antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
