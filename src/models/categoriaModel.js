const prisma = require('../prisma');

const getAllCategoria = async() => {
    return prisma.Categoria.findMany({
        orderBy: {
            id: 'desc'
        }
    });
};

const getCategoriaById = async(id) => {
    return prisma.Categoria.findUnique({
        where: {
            id: id
        }
    });
};

const createCategoria = async(nome) => {
    return prisma.Categoria.create({
        data: {
            nome: nome
        }
    });
};

const updateCategoria = async(id, nome) => {
    const categoria = await getCategoriaById(id);

    if(!categoria){
        throw new Error("Categoria não encontrada");
    };

    return prisma.Categoria.update({
        where: {
            id: id
        },
        data: {
            nome: nome
        }
    });
};

const deleteCategoria = async(id) => {
    const categoria = await getCategoriaById(id);

    if(!categoria){
        throw new Error("Categoria não encontrada");
    };

    return prisma.Categoria.delete({
        where: {
            id: id
        }
    });
};

module.exports = {
    getAllCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};

