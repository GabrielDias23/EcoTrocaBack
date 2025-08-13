-- DropForeignKey
ALTER TABLE "public"."Mensagem" DROP CONSTRAINT "Mensagem_chatId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Mensagem" ADD CONSTRAINT "Mensagem_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "public"."Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
