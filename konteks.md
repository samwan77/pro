# 🔧 Implementation Plan: Automasi Booking Barber Home Service

> **Klien:** Barber profesional (eks-Front Barbershop, kini di Hotman Barbershop)
> **Sistem:** Booking otomatis + Pembayaran QRIS + Buku Kas + Auto-Reminder
> **Dibuat oleh:** SAMWAN Solutions

---

## 📊 Profil Klien & Social Proof

| Aspek | Detail |
|-------|--------|
| **Lokasi Kerja** | Hotman Barbershop, Jl. Magelang (Shift 10:00-21:30) |
| **Base Home Service** | Sinduadi, Jogja (Radius max 10 KM) |
| **Google Reviews** | 100+ ulasan organik, mayoritas ⭐⭐⭐⭐⭐ |
| **USP** | Komunikatif, konsultasi styling, bisa bahasa Inggris, pelanggan WNA/expat |
| **Problem Utama** | Overwhelmed by demand, harga inkonsisten manual, rekap data manual |

---

## 💸 Biaya Operasional SAMWAN (Actual Cost)

### Aset yang Sudah Dimiliki (Shared dengan Deluxe Interior)

| Item | Biaya/Bulan | Status |
|------|-------------|--------|
| **Make.com Pro** | $10.59 (~Rp 170rb) | ✅ Sudah bayar — Deluxe pakai 832 ops + Barber 420 ops = **1.252/10.000 ops** |
| **OpenRouter** | Saldo masih sisa | ✅ Sudah top-up $5 |
| **Google Maps API** | Rp 0 | ✅ Free $200 credit/bulan |
| **Hosting (Vercel)** | Rp 0 | ✅ Gratis |
| **Google Sheets + Calendar** | Rp 0 | ✅ Gratis |

### Biaya Tambahan untuk Project Barber

| Item | Biaya/Bulan | Keterangan |
|------|-------------|------------|
| **Fonnte (device baru)** | **Rp 66.000** | Nomor WA barber beda dari Deluxe → perlu device terpisah |
| **Midtrans MDR** | ~0.7%/transaksi | ~Rp 400/transaksi — diserap klien barber |

### ✅ Total Marginal Cost Kamu per Bulan: **Rp 66.000**

---

## 💰 Pricing Strategy: Harga Jasa SAMWAN ke Klien Barber

### Struktur Harga

| Komponen | Harga | Keterangan |
|----------|-------|------------|
| **Setup Fee (sekali bayar)** | **Rp 500.000 – 750.000** | Landing page + 3 scenario Make.com + Sheets + Calendar + Midtrans |
| **Maintenance Bulanan** | **Rp 300.000 – 500.000** | Monitoring, fix bug, update, support WA |

### Profit Margin

| | Harga ke Klien | Biaya Kamu | **Profit** | **Margin** |
|--|---------------|------------|------------|------------|
| Setup (sekali) | Rp 500-750rb | ~Rp 0 (waktu aja) | **Rp 500-750rb** | 100% |
| Bulanan | Rp 300-500rb | Rp 66rb | **Rp 234-434rb** | 78-87% |

### Break-Even Analysis untuk Klien

```
Tanpa sistem:
  Booking manual via WA → sering kelewat/lupa → kehilangan 3-5 pelanggan/bulan
  Lost revenue: 5 × Rp 55.000 = Rp 275.000/bulan

Dengan sistem SAMWAN:
  Fee SAMWAN: Rp 300.000/bulan
  Tapi: 0 booking terlewat + auto-reminder H+30 = tambah 3-5 repeat customer
  Extra revenue: 5 × Rp 55.000 = Rp 275.000/bulan

  → Fee-nya BAYAR SENDIRI dari pelanggan yang sebelumnya hilang
  → Semua booking tambahan di atasnya = PURE PROFIT buat klien
```

---

## 🎁 Strategi Trial (14 Hari)

### Timeline Trial

| Fase | Durasi | Yang Kamu Kasih | Yang Klien Bayar |
|------|--------|-----------------|------------------|
| **Trial** | 14 hari | Sistem aktif penuh | **Rp 0** |
| **Bulan 1** | Setelah trial OK | Full service | Setup Rp 500rb + Maintenance Rp 300rb = **Rp 800rb** |
| **Bulan 2+** | Ongoing | Maintenance only | **Rp 300rb/bulan** |

### Hari ke-7: Kirim Laporan Pertama
> *"Mas, update minggu pertama — sudah ada [X] booking masuk lewat sistem. Ini screenshot datanya 📊"*

### Hari ke-12: Closing Conversation
> *"Mas, trial kita 2 hari lagi selesai. Hasilnya [recap]. Fee bulan depan Rp 300rb + setup Rp 500rb. Mau saya buatkan invoice-nya?"*

### Script Nawarin Trial
> *"Mas, sistemnya saya aktifkan gratis 2 minggu dulu. Kalau dalam 2 minggu ada minimal 5-10 booking yang masuk lewat sistem, kita lanjut. Kalau tidak ada hasil, saya matikan dan mas tidak rugi apa-apa."*

### Leverage (Pengaman Agar Klien Terus Bayar)
- **Landing page:** Domain & hosting di akun SAMWAN → jika tidak bayar, website mati
- **Automasi:** Make.com & Fonnte di akun SAMWAN → jika tidak bayar, bot mati
- **Meeting Evaluasi H-12:** Tunjukkan data booking, ajukan fee sebelum trial habis

---

## 📅 Timeline Eksekusi (7 Hari)

```
HARI 1: Setup Fondasi (Akun + API Keys + Google Sheets + Calendar)
HARI 2: Build Landing Page (Form Booking)
HARI 3: Scenario 1 — Penerimaan Booking (WA → AI Parser → Distance → Calendar Check → Harga → QRIS)
HARI 4: Scenario 2 — Konfirmasi Bayar (Midtrans Webhook → Lock Calendar → Sheet → WA Konfirmasi)
HARI 5: Scenario 3 — Auto-Reminder H+30 (Retention Loop)
HARI 6: Testing End-to-End + Polish
HARI 7: Go Live + Monitoring
```

---

# HARI 1: Setup Fondasi

## 1.1 — API Keys & Akun

Daftar dan catat semua credential ini:

| Service | Yang Dibutuhkan | Cara Dapat |
|---------|----------------|------------|
| **Fonnte** | API Token + Device ID | fonnte.com → Scan QR WA klien |
| **OpenRouter** | API Key (`sk-or-v1-xxx`) | openrouter.ai → $5 top-up → Create Key |
| **Google Cloud** | Distance Matrix API Key | console.cloud.google.com → Enable API → Create Credential |
| **Midtrans** | Server Key + Client Key | midtrans.com → Sandbox dulu → Production nanti |
| **Make.com** | Akun Free | make.com → Sign Up |

> [!IMPORTANT]
> **Simpan semua credential di file aman (bukan di Google Sheet).** Pelajaran dari setup Deluxe: credentials bocor = sistem mati.

## 1.2 — Google Sheets: "Buku Kas & CRM Barber"

Buat Google Sheet: **`[BARBER] Home Service — Booking & Kas`**

**Tab 1: `📋 Bookings`**

| Kolom | Header | Contoh |
|-------|--------|--------|
| A | `📅 Tanggal Booking` | 2026-05-10 08:00 |
| B | `👤 Nama Pelanggan` | Ronny Tricahyono |
| C | `📱 Nomor WA` | 6281234567890 |
| D | `✂️ Layanan` | Basic Cut |
| E | `📍 Lokasi (Maps Link)` | https://maps.google.com/... |
| F | `🏠 Detail Kamar/Lantai` | Kos Sinduadi Lt.2 No.5 |
| G | `📏 Jarak (KM)` | 3.2 |
| H | `💈 Biaya Jasa` | Rp 45.000 |
| I | `🛵 Biaya Transport` | Rp 10.000 |
| J | `💰 Total Bayar` | Rp 55.000 |
| K | `💳 Status Bayar` | Lunas / Pending / Batal |
| L | `📊 Status Booking` | Confirmed / Done / Cancelled |
| M | `🔁 Reminder H+30` | Belum / Terkirim |

**Tab 2: `💰 Kas Bulanan`** (Auto-summary)

| Kolom | Header |
|-------|--------|
| A | `📅 Bulan` |
| B | `✂️ Total Sesi` |
| C | `💰 Pendapatan Jasa` |
| D | `🛵 Pendapatan Transport` |
| E | `💳 Potongan MDR (~0.7%)` |
| F | `💵 Net Income` |

## 1.3 — Google Calendar Setup

- Buat calendar baru: **"Barber Home Service"**
- Warna: Biru (beda dari calendar pribadi)
- **Pre-block jam kerja Hotman** (10:00-21:30 setiap hari kecuali Selasa) sebagai event recurring → ini jadi "wall" otomatis agar sistem tidak bisa booking di jam tersebut

---

# HARI 2: Landing Page

## 2.1 — Build Single Page (HTML di Vercel)

Halaman sederhana tapi profesional, berisi:
1. **Hero Section** — "Pengalaman Barbershop Premium 5-Star, Kini Hadir di Kamar Anda"
2. **Social Proof** — Kutipan review Google terbaik (dari CSV data)
3. **Pricing Transparan** — Basic Cut Rp 45.000 + Transport (auto-kalkulasi)
4. **Form Booking** — Fields:
   - Nama Lengkap
   - Nomor WhatsApp
   - Layanan (dropdown)
   - Tanggal & Jam yang Diinginkan (date + time picker)
   - Share Location / Alamat Lengkap
   - Detail Kamar/Lantai (text)
5. **FAQ** — Jam tersedia, radius, kebijakan batal

> [!TIP]
> **Re-use pattern dari Deluxe Interior:** Form submit → fire-and-forget ke Make.com webhook (mode `no-cors`) + buka WhatsApp otomatis sebagai backup. Sudah proven di `deluxe-interior/index.html`.

## 2.2 — Deploy ke Vercel

```bash
# Di folder project barber
npx -y vercel --prod
```

Gratis, domain bawaan: `barber-homeservice.vercel.app`
Nanti custom domain kalau klien approve.

---

# HARI 3: Scenario 1 — Penerimaan Booking & Penagihan

**Ini scenario paling kompleks. 8 module di Make.com:**

```
[Webhook WA/Form] → [AI Parser] → [Google Maps Distance] → [Filter Radius]
→ [Calendar Check] → [Hitung Harga] → [Midtrans QRIS] → [WA Balas Rincian]
```

### Module 1: Webhook (Terima Input)
- Custom Webhook di Make.com
- Menerima data dari 2 sumber:
  - **Form website** (langsung structured)
  - **Chat WA via Fonnte** (perlu di-parse AI dulu)

### Module 2: AI Parser (OpenRouter)
- Model: `deepseek/deepseek-chat-v3-0324` (~$0.14/1M tokens)
- Prompt:

```
Kamu adalah sistem booking barber home service di Jogja.

ATURAN JAM:
- Hari Rabu-Senin: HANYA slot 08:00-09:00 (pagi) atau 22:00+ (malam)
- Hari Selasa: Bebas seharian
- TOLAK jika pelanggan minta jam 10:00-21:30 (kecuali Selasa)

Dari pesan berikut, ekstrak JSON:
"{pesan_pelanggan}"

Output HANYA JSON:
{
  "nama": "...",
  "layanan": "basic_cut",
  "tanggal": "YYYY-MM-DD",
  "jam": "HH:MM",
  "lokasi": "alamat atau link maps",
  "detail_kamar": "...",
  "valid": true/false,
  "tolak_alasan": "..." 
}
```

### Module 3: Google Maps Distance Matrix
- Origin: `Sinduadi, Sleman, Yogyakarta` (fixed)
- Destination: `{{lokasi_pelanggan}}`
- API: `https://maps.googleapis.com/maps/api/distancematrix/json`

### Module 4: Filter Radius
- **IF jarak > 10 KM** → Stop + WA balas:
  > "Mohon maaf kak, lokasi Anda di luar jangkauan kami (max 10 KM dari Sinduadi). Tapi kakak bisa datang langsung ke Hotman Barbershop di Jl. Magelang ya! 🙏"
- **IF valid = false** → Stop + WA balas tolak_alasan

### Module 5: Google Calendar — Search Events
- Cek apakah slot tanggal+jam yang diminta bentrok
- Kalau bentrok → WA balas: "Maaf kak, slot jam tersebut sudah terisi. Tersedia jam [alternatif]. Mau diubah?"

### Module 6: Hitung Harga (Set Variable)
```
Biaya Jasa = Rp 45.000 (fixed)

IF jarak < 1 KM:
  Transport = Rp 0
ELSE IF jarak <= 3 KM:
  Transport = Rp 10.000
ELSE:
  Transport = Rp 10.000 + ((jarak - 3) × Rp 2.500)

Total = Biaya Jasa + Transport
```

### Module 7: Midtrans — Generate Payment Link
- API: `https://api.midtrans.com/v1/payment-links`
- Headers: `Authorization: Basic [base64(ServerKey:)]`
- Body:
```json
{
  "transaction_details": {
    "order_id": "BARBER-{{timestamp}}",
    "gross_amount": {{total}}
  },
  "customer_details": {
    "first_name": "{{nama}}",
    "phone": "{{nowa}}"
  },
  "usage_limit": 1,
  "expiry": { "duration": 60, "unit": "minutes" }
}
```

### Module 8: WA Balas Rincian (Fonnte)
```
Halo kak *{{nama}}* ✂️

Berikut rincian booking Home Service:

📅 {{tanggal}}, Jam {{jam}}
📍 {{lokasi}} ({{jarak}} KM)
🏠 {{detail_kamar}}

💈 Jasa Potong: Rp {{biaya_jasa}}
🛵 Transport: Rp {{transport}}
━━━━━━━━━━━━━
💰 *TOTAL: Rp {{total}}*

Silakan bayar via QRIS di link ini untuk mengunci jadwal:
🔗 {{payment_link}}

⏳ Link berlaku 60 menit.

⚠️ Pembatalan H-2 jam = tidak bisa refund, hanya reschedule.
```

---

## Scenario 2 — Konfirmasi Pembayaran

**Trigger: Midtrans webhook `settlement`**

```
[Midtrans Webhook] → [Lock Calendar] → [Catat Sheet] → [WA Konfirmasi]
```

### Module 1: Webhook Midtrans
- Dengarkan status `transaction_status: "settlement"`

### Module 2: Google Calendar — Create Event
```
Title: "✂️ Home Service — {{nama}}"
Start: {{tanggal}} {{jam}}
End: +1 jam
Location: {{lokasi}}
Description: "WA: {{nowa}} | Kamar: {{detail_kamar}} | Total: Rp {{total}}"
```

### Module 3: Google Sheets — Add Row
- Tab `📋 Bookings` → isi semua kolom
- Status Bayar: `Lunas`
- Status Booking: `Confirmed`

### Module 4: WA Konfirmasi (Fonnte)
```
✅ Pembayaran diterima, kak *{{nama}}*!

Jadwal terkunci:
📅 {{tanggal}}, Jam {{jam}}
📍 {{lokasi}}

Saya akan tiba tepat waktu. Pastikan area potong sudah ready ya (kursi + akses listrik jika perlu).

Sampai jumpa! ✂️🔥
```

---

## Scenario 3 — Auto-Reminder H+30

**Trigger: Scheduler Make.com setiap pagi jam 08:00**

```
[Schedule 08:00] → [Search Sheet H+30] → [Iterator] → [WA Reminder]
```

### Module 1: Schedule
- Setiap hari jam 08:00 WIB

### Module 2: Google Sheets — Search Rows
- Filter: Tanggal Booking = (hari ini - 30 hari) AND Status Booking = `Done` AND Reminder H+30 = `Belum`

### Module 3: Iterator
- Loop setiap pelanggan yang match

### Module 4: WA Reminder (Fonnte)
```
Halo kak *{{nama}}* 👋

Udah sebulan nih sejak terakhir potong. Rambutnya udah mulai kerasa agak panjang belum? 😄

Kalau mau rapikan lagi minggu ini, langsung balas chat ini dengan ketik "Booking" ya!

Saya standby ✂️🔥
```

### Module 5: Google Sheets — Update Row
- Set Reminder H+30 = `Terkirim`

---

## Checklist Testing

- [ ] Submit form dari landing page → data masuk ke Make.com
- [ ] AI Parser mengekstrak data dengan benar
- [ ] Google Maps menghitung jarak akurat
- [ ] Lokasi > 10 KM → ditolak halus ✅
- [ ] Jam 10:00-21:30 (bukan Selasa) → ditolak ✅
- [ ] Calendar bentrok → kasih alternatif ✅
- [ ] Harga terkalkulasi benar (jasa + transport)
- [ ] Link QRIS Midtrans tergenerate
- [ ] Bayar QRIS (sandbox) → Calendar terkunci + Sheet tercatat + WA konfirmasi
- [ ] Tunggu 30 hari (atau mock date) → WA reminder terkirim

---

## Go Live & Monitoring

- [ ] Switch Midtrans dari Sandbox → Production
- [ ] Share landing page ke klien untuk di-broadcast
- [ ] Monitor Make.com dashboard 24 jam pertama
- [ ] Pastikan Fonnte tidak kena rate limit

---

## 📋 Credit Budget (Make.com Free Tier: 1.000 ops/bulan)

| Scenario | Ops/Run | Est. Runs/Bulan | Total |
|----------|---------|-----------------|-------|
| #1 Booking Flow (8 module) | ~8 | 30 | 240 |
| #2 Payment Confirm (4 module) | ~4 | 25 | 100 |
| #3 Reminder H+30 (4 module) | ~4 | 20 | 80 |
| **TOTAL** | | | **420 ops** |

> **420 dari 1.000 = 42% Free Tier.** Cukup untuk ~30 booking/bulan tanpa upgrade ke Pro.

---

## 🔗 Credentials Master List

| Item | Value | Source |
|------|-------|--------|
| Make.com Webhook (Booking) | `https://hook.eu2.make.com/xxx` | Make Scenario #1 |
| Make.com Webhook (Midtrans) | `https://hook.eu2.make.com/yyy` | Make Scenario #2 |
| Fonnte API Token | `xxxxxxxx` | fonnte.com |
| OpenRouter API Key | `sk-or-v1-xxxxx` | openrouter.ai |
| Google Maps API Key | `AIzaSyXXXX` | Google Cloud Console |
| Midtrans Server Key | `SB-Mid-server-xxx` | midtrans.com |
| Midtrans Client Key | `SB-Mid-client-xxx` | midtrans.com |
| Google Sheet ID | `1AbCdEf...` | URL Sheet |
| Google Calendar ID | `xxx@google.com` | Calendar Settings |

---

## ⚠️ Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| **Fonnte = Unofficial API** | Max 50 pesan/hari ke nomor baru, personalize semua pesan |
| **Midtrans MDR ~0.7%** | Diserap klien (Rp 400/transaksi) — sudah disetujui |
| **Google Maps API billing** | $200 free credit/bulan = ~40.000 request. Lebih dari cukup |
| **Pelanggan tidak bayar QRIS** | Link expired 60 menit, slot otomatis terbuka lagi |
| **Double booking** | Calendar Check di Scenario 1 mencegah ini |

---

## 🎯 Harga Jasa Barber (Tidak Diubah — Sesuai Brief Klien)

- **Basic Cut:** Rp 45.000 (fixed)
- **Hair Colouring / Perming:** TBD (tanya klien)
- **Transport:** Gratis < 1KM, Rp 10.000 (1-3KM), +Rp 2.500/KM di atasnya

---

## 🚀 Upgrade Path (Upsell ke Klien Setelah Proven)

| Bulan | Fitur Tambahan | Potensi Upsell |
|-------|---------------|----------------|
| **Bulan 2** | Auto-request Google Review (WA H+1 setelah potong) | +Rp 100rb/bulan |
| **Bulan 3** | Instagram DM auto-reply | +Rp 150rb/bulan |
| **Bulan 4** | Dashboard analytics (Looker Studio) | +Rp 200rb/bulan |
| **Long-term** | Multi-barber support (scaling ke tim) | Renegotiasi fee |

> [!TIP]
> **Revenue projection SAMWAN dari klien Barber saja:**
> - Bulan 1: Rp 800rb (setup + maintenance)
> - Bulan 2-12: Rp 300rb × 11 = Rp 3.300.000
> - **Total tahun pertama: ~Rp 4.100.000 dari 1 klien**
> - Biaya kamu: Rp 66rb × 12 = Rp 792.000
> - **Net profit: ~Rp 3.308.000 (margin 80%)**
