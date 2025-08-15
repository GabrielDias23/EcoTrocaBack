const prisma = require('../prisma');

const getAllUsuarios = async() =>{
    return prisma.Usuario.findMany({
        orderBy: {
            nome: 'desc'
        },
    });
};

const getUsuarioById = async(id) => {
    return prisma.Usuario.findUnique({
        where: {
            id: id
        }
    });
};

const createUsuario = async(dadosUsuario) => {
    return prisma.Usuario.create({
        data: dadosUsuario
    });
};

const updateUsuario = async(id, dadosUsuario) => {
    return prisma.Usuario.update({
        where: {
            id: id
        },
        data: dadosUsuario
    });
};

const deleteUsuario = async(id) => {
    return prisma.Usuario.delete({
        where:{
            id:id
        }
    });
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
}