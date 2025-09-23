const prisma = require('../prisma');
const bcrypt = require("bcrypt");

const getAllUsuarios = async() =>{
    return prisma.Usuario.findMany({
        orderBy: {
            nome: 'desc'
        },
    });
};

const getUsuarioByEmail = async(email) => {
    return prisma.Usuario.findUnique({
        where: { email },
    });  
};

const getUsuarioById = async(id) => {
    return prisma.Usuario.findUnique({
        where: {
            id: id
        }
    });
};

const createUsuario = async(nome, email, senha, cidade, estado, dataNasc, imgPerfil) => {
    const senhaCrypt = await bcrypt.hash(senha, 10);
    return prisma.Usuario.create({
        data: {
            nome: nome,
            email: email,
            senhaHash: senhaCrypt,
            cidade: cidade,
            estado: estado,
            dataNasc: new Date(dataNasc),
            imgPerfil
        }
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
    getUsuarioByEmail,
    deleteUsuario
}