const prisma = require('../prisma');

const getAllUsuarios = async() =>{
    return prisma.Usuario.findMany({
        orderBy: {
            nome: 'desc'
        },
        take: 10
    });
};

const getUsuarioById = async(id) => {
    return prisma.Usuario.findUnique({
        where: {
            id: id
        }
    });
};

const createUsuario = async(nome, email, senhaHash, cidade, estado, dataNasc, imgPerfil) => {
    return prisma.Usuario.create({
        data: {
            nome: nome,
            email: email,
            senhaHash: senhaHash,
            cidade: cidade,
            estado: estado,
            dataNasc: dataNasc,
            imgPerfil: imgPerfil
        }
    });
};

const updateUsuario = async(id, nome, email, senhaHash, cidade, estado, dataNasc, imgPerfil) => {
    const usuario = await getUsuarioById(id);

    if(!usuario){
        throw new Error("Usuário não encontrado");
    };

    return prisma.Usuario.update({
        where: {
            id: id
        },
        data: {
            nome: nome,
            email: email,
            senhaHash: senhaHash,
            cidade: cidade,
            estado: estado,
            dataNasc: dataNasc,
            imgPerfil: imgPerfil
        }
    });
};

const deleteUsuario = async(id) => {
    const usuario = await getUsuarioById(id);

    if(!usuario){
        throw new Error("Usuário não encontrado");
    };

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