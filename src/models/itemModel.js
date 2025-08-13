const prisma = require('../prisma');

const getAllItens = async () => {
    return prisma.Item.findMany({
        orderBy: {
            dataPublicacao: 'desc'
        },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            categoria: true,
        }
    });
};

const getItemById = async (id) => {
    return prisma.Item.findUnique({
        where: {
            id: id
        },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            },
            categoria: true,
        }
    });
};

const createItem = async (nome, descricao, usuarioId, categoriaId, cidade, estado, imagem) => {
    return prisma.Item.create({
        data: {
            nome: nome,
            descricao: descricao,
            cidade: cidade,
            estado: estado,
            imagem: imagem,
            usuario: {
                connect: { id: usuarioId }
            },
            categoria: {
                connect: { id: categoriaId }
            },
        }
    });
};

const updateItem = async (id, dadosParaAtualizar) => {
    const item = await getItemById(id);

    if (!item) {
        throw new Error("Item não encontrado");
    }

    return prisma.Item.update({
        where: {
            id: id
        },
        data: dadosParaAtualizar
    });
};

const deleteItem = async (id) => {
    const item = await getItemById(id);

    if (!item) {
        throw new Error("Item não encontrado");
    }

    return prisma.Item.delete({
        where: {
            id: id
        }
    });
};

module.exports = {
    getAllItens,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};