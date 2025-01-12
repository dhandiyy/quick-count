# Quick Count Pemilihan Bupati Kabupaten Sumenep 2024

Aplikasi quick count untuk memantau hasil perhitungan suara pada Pemilihan Bupati Kabupaten Sumenep 2024. Aplikasi ini menyediakan fitur input data real-time oleh petugas TPS, verifikasi oleh admin, dan tampilan hasil quick count yang dapat diakses publik.
***
## Teknologi yang Digunakan

### Backend
- Node.js v20.11.1
- Express.js
- Prisma ORM
- MySQL (Production)
- PostgreSQL (Development/Experiment)
- JWT Authentication
- Multer untuk upload file

### Frontend
- React 18.3.1
- Redux Toolkit
- Tailwind CSS
- Realtime updates (10 menit interval)

----

## Fitur Utama

### Halaman Publik
- Visualisasi hasil quick count menggunakan bar chart
- Persentase total suara tiap paslon
- Persentase total suara masuk
- Informasi waktu update terakhir
- Detail hasil per desa dan kecamatan

### Dashboard Admin
- Verifikasi hasil input petugas TPS
- Melihat status pengisian (pending/accepted/rejected)
- Validasi data dan bukti foto
- Accept/Reject hasil input

### Dashboard Petugas TPS
- Input hasil perhitungan suara
- Upload foto bukti
- Input detail TPS dan status
- Monitoring status verifikasi

---

## Instalasi dan Penggunaan

1. Clone repository
```bash
git clone [URL_REPOSITORY]
cd quick-count-sumenep
```

2. Setup Backend
```bash
cd backend
npm install
# Setup database
npx prisma migrate dev
# Start development server
npm run dev
```

3. Setup Frontend
```bash
cd frontend/quick_count
npm install
npm run dev
```
---

## Environment Variables

### Backend
```env
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET="your-secret-key"
PORT=5000
```

### Frontend
```env
VITE_API_URL="http://localhost:3001/api"
```

---

## Struktur Project
```
quick-count-sumenep/
├── backend/                    # Express.js backend
├── frontend/quick_count        # React frontend
└── README.md                   # Dokumentasi utama
```

---
## Alur Kerja Aplikasi

1. **Input Data**
    - Petugas TPS login ke sistem
    - Input data suara dan upload foto bukti
    - Data masuk dengan status "pending"

2. **Verifikasi**
    - Admin memeriksa data dan foto
    - Menerima atau menolak hasil input
    - Hanya data yang diterima yang masuk perhitungan

3. **Kalkulasi**
    - Sistem menghitung total suara yang telah diverifikasi
    - Persentase dihitung berdasarkan total DPT Kabupaten Sumenep
    - Update otomatis setiap 10 menit

---

