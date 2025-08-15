const prisma = require('../prisma');

const getAllPropostas = async () => {
    return prisma.proposta.findMany({
        orderBy: {
            dataProposta: 'desc'
        },
        include: {
            autor: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            itemOferecido: true,
            itemDesejado: true,
            chat: true,
        }
    });
};

const getPropostaById = async (id) => {
    return prisma.proposta.findUnique({
        where: {
            id: id
        },
        include: {
            autor: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            itemOferecido: true,
            itemDesejado: true,
            chat: true,
        }
    });
};

const createProposta = async (dadosProposta) => {
    const {autorId, itemOferecidoId, itemDesejadoId} = dadosProposta;
    return prisma.proposta.create({
        data: {
            autor: { connect: { id: autorId } },
            itemOferecido: { connect: { id: itemOferecidoId } },
            itemDesejado: { connect: { id: itemDesejadoId } },
        }
    });
};

const updateProposta = async (id, dadosParaAtualizar) => {
    return prisma.proposta.update({
        where: {
            id: id
        },
        data: dadosParaAtualizar
    });
};

const deleteProposta = async (id) => {
    return prisma.proposta.delete({
        where: {
            id: id
        }
    });
};

module.exports = {
    getAllPropostas,
    getPropostaById,
    createProposta,
    updateProposta,
    deleteProposta,
};