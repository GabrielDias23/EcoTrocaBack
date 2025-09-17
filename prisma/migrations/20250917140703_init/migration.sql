-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('ADMIN', 'PADRAO');

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "tipoUsuario" "public"."TipoUsuario" DEFAULT 'PADRAO';
