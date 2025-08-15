const prisma = require('../prisma');

const getAllChats = async () => {
    return prisma.chat.findMany({
        include: {
            proposta: true,
            mensagens: true,
        }
    });
};

const getChatById = async (id) => {
    return prisma.chat.findUnique({
        where: { 
            id: id
        },
        include: {
            proposta: true,
            mensagens: {
                orderBy: {
                    dataHora: 'asc'
                },
                include: {
                    usuario: true
                }
            },
        }
    });
};

const createChat = async (propostaId) => {
    return prisma.chat.create({
        data: {
            proposta: {
                connect: { id: propostaId }
            }
        }
    });
};

const deleteChat = async (id) => {
    return prisma.chat.delete({ 
        where: { 
            id: id
        }
     });
};

module.exports = {
    getAllChats,
    getChatById,
    createChat,
    deleteChat,
};