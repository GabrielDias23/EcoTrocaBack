const prisma = require('../prisma');

const getAllMensagem = async () => {
    return prisma.mensagem.findMany({
        orderBy: {
            dataHora: 'asc'
        },
        include: {
            usuario: true,
            chat: true,
        }
    });
};

const getMensagemById = async (id) => {
    return prisma.mensagem.findUnique({
        where: { 
            id: id
        },
        include: {
            usuario: true,
            chat: true,
        }
    });
};

const createMensagem = async (dadosMensagem) => {
    const {conteudo, usuarioId, chatId} =dadosMensagem
    return prisma.mensagem.create({
        data: {
            conteudo: conteudo,
            usuario: {
                connect: { id: usuarioId }
            },
            chat: {
                connect: { id: chatId }
            }
        }
    });
};

const updateMensagem = async (id, dadosParaAtualizar) => {
    return prisma.mensagem.update({
        where: { 
            id: id
        },
        data: dadosParaAtualizar
    });
};

const deleteMensagem = async (id) => {
    return prisma.mensagem.delete({ 
        where: { 
            id: id
        } 
    });
};

module.exports = {
    getAllMensagem,
    getMensagemById,
    createMensagem,
    updateMensagem,
    deleteMensagem,
};