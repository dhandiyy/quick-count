-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "Approval" AS ENUM ('ACCEPT', 'REJECT', 'PENDING');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PARTIAL', 'COMPLETE');

-- CreateTable
CREATE TABLE "Paslon" (
    "id" SERIAL NOT NULL,
    "nomer_urut" INTEGER NOT NULL,
    "nama_ketua" TEXT NOT NULL,
    "nama_wakil" TEXT NOT NULL,

    CONSTRAINT "Paslon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kecamatan" (
    "id" SERIAL NOT NULL,
    "nama_kecamatan" TEXT NOT NULL,

    CONSTRAINT "Kecamatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desa" (
    "id" SERIAL NOT NULL,
    "nama_desa" TEXT NOT NULL,
    "kecamatan_id" INTEGER NOT NULL,

    CONSTRAINT "Desa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tps" (
    "id" SERIAL NOT NULL,
    "nomer_tps" TEXT NOT NULL,
    "jumlah_dpt" INTEGER NOT NULL,
    "kecamatan_id" INTEGER NOT NULL,
    "desa_id" INTEGER NOT NULL,

    CONSTRAINT "Tps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasilSuara" (
    "id" SERIAL NOT NULL,
    "tps_id" INTEGER NOT NULL,
    "jumlah_suara_paslon1" INTEGER NOT NULL,
    "jumlah_suara_paslon2" INTEGER NOT NULL,
    "jumlah_suara_tidak_sah" INTEGER NOT NULL,
    "total_suara_masuk" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PARTIAL',
    "approval" "Approval" NOT NULL DEFAULT 'PENDING',
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bukti_foto" TEXT,

    CONSTRAINT "HasilSuara_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Desa" ADD CONSTRAINT "Desa_kecamatan_id_fkey" FOREIGN KEY ("kecamatan_id") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tps" ADD CONSTRAINT "Tps_kecamatan_id_fkey" FOREIGN KEY ("kecamatan_id") REFERENCES "Kecamatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tps" ADD CONSTRAINT "Tps_desa_id_fkey" FOREIGN KEY ("desa_id") REFERENCES "Desa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilSuara" ADD CONSTRAINT "HasilSuara_tps_id_fkey" FOREIGN KEY ("tps_id") REFERENCES "Tps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasilSuara" ADD CONSTRAINT "HasilSuara_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
