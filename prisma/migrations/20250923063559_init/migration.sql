-- DropForeignKey
ALTER TABLE "public"."Item" DROP CONSTRAINT "Item_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Proposta" DROP CONSTRAINT "Proposta_autorId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Item" ADD CONSTRAINT "Item_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Proposta" ADD CONSTRAINT "Proposta_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
