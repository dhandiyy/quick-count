# Backend Quick Count Sumenep

Backend service untuk aplikasi Quick Count Pemilihan Bupati Kabupaten Sumenep 2024.

## Tech Stack

- Node.js v20.11.1
- Express.js v4.21.1
- Prisma ORM v5.22.0
- MySQL/PostgreSQL
- JWT Authentication

## Dependencies

```json
{
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "prisma": "^5.22.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  }
}
```

## Setup Development

1. Install dependencies
```bash
npm install
```

2. Setup database
```bash
# Setup Prisma dengan MySQL
npx prisma migrate dev

# Atau dengan PostgreSQL (sesuaikan DATABASE_URL di .env)
```

3. Run development server
```bash
npm run dev
```

## Environment Variables

Buat file `.env` dengan variabel berikut:

```env
# Database (pilih salah satu)
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
# atau
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# JWT
SECRET="your-secret-key"

# Server
PORT=5000
```

## Database Schema
![img_1.png](diagram_database.png)


## API Endpoints

https://documenter.getpostman.com/view/32333974/2sAYQWKDht

## Authentication

Sistem menggunakan authentikasi berbasis JWT dengan alur:
1. User register dengan username, password, nama, dan role
2. Saat login, sistem memverifikasi username dan password
3. JWT token digenerate dan dikirim ke client
4. Token digunakan untuk mengakses protected endpoints

## File Upload

- Menggunakan multer untuk handling file upload
- Khusus untuk upload foto bukti perhitungan suara
- Validasi tipe file dan ukuran dilakukan sebelum penyimpanan

