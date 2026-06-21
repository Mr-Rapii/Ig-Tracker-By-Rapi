# Pending — IG Follow Request Tracker

Website untuk melihat akun yang belum menerima follow request Instagram-mu,
berdasarkan file ZIP data ekspor resmi dari Instagram.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur proyek

```
app/
  page.tsx                 → landing page (hero + upload)
  how-it-works/page.tsx    → panduan unduh data Instagram
  tutorial/page.tsx        → halaman video tutorial
  faq/page.tsx             → FAQ
  privacy|terms|cookies/   → halaman legal
  api/upload/route.ts      → endpoint upload & parsing ZIP
  layout.tsx, globals.css

components/
  Navbar.tsx, Footer.tsx
  UploadArea.tsx            → drag & drop, progress, validasi
  ResultsList.tsx           → tabel hasil, search, sort, export CSV

lib/
  parseInstagramData.ts     → logika ekstraksi ZIP & parsing JSON
```

## Cara kerja parsing

1. User upload file `.zip` (maks 50MB) lewat `UploadArea`.
2. File dikirim sebagai `FormData` ke `POST /api/upload`.
3. Server membaca ZIP **di memori** (tidak ditulis ke disk) menggunakan
   `adm-zip`, mencari file JSON yang path-nya mengandung
   `follow_request` atau `pending`.
4. `extractUsernamesFromAny()` mencoba beberapa kemungkinan struktur JSON
   karena format ekspor Instagram berubah-ubah antar versi:
   - `relationships_follow_requests_sent`
   - `relationships_follow_requests`
   - struktur `string_list_data` (format umum data IG terbaru)
   - fallback generik untuk array apa pun di top-level objek
5. Hasil dikembalikan sebagai JSON ke client, ditampilkan di `ResultsList`.

⚠️ **Catatan penting:** struktur JSON ekspor Instagram bisa berubah
sewaktu-waktu. Sebelum deploy ke production, **unduh contoh data asli dari
akun Instagram-mu sendiri** dan sesuaikan `lib/parseInstagramData.ts` agar
cocok dengan struktur file terbaru yang kamu temukan. File contoh yang
diasumsikan dalam skeleton ini ada di komentar kode tersebut.

## Yang masih perlu kamu lengkapi

- [ ] Uji dengan file ZIP data Instagram asli (struktur JSON IG sering berubah)
- [ ] Tambahkan rate limiting di `/api/upload` (mis. dengan `@upstash/ratelimit`)
- [ ] Tambahkan banner cookie consent (mis. `react-cookie-consent`)
- [ ] Sambungkan Google Analytics / Plausible
- [ ] Isi konten halaman Tutorial dengan video asli
- [ ] (Opsional) Tambahkan dark/light mode toggle — saat ini hanya dark theme
- [ ] (Opsional) Tambahkan i18n untuk Bahasa Indonesia & English

## Deploy

Project ini siap di-deploy ke Vercel:

```bash
npx vercel
```

Tidak ada environment variable wajib untuk fitur inti. Tambahkan
`NEXT_PUBLIC_GA_ID` jika kamu menyambungkan Google Analytics.
