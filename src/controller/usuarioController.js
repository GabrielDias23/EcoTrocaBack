const {getAllUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario} = require('../models/usuarioModel');

const getAllUsariosHandler = async (req, res) => {
    try{
        const usuario = await getAllUsuarios();
        return res.status(200).json(usuario);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const getUsuarioByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    try{
        const usuario = await getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        };

        return res.status(200).json(usuario);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const createUsuarioHandler = async (req, res) => {
    const{nome, email, senhaHash, cidade, estado, dataNasc, imgPerfil} = req.body;

    try{
        const usuario = await createUsuario(nome, email, senhaHash, cidade, estado, dataNasc, imgPerfil);
        return res.status(201).json(usuario);
    }catch(error){
        return res.status(500).json({error: error.message});
    };

};

const updateUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    const dadosParaAtualizar = req.body;

    if (!nome || !email || !senhaHash || !cidade || !estado || !dataNasc || !imgPerfil) {
        return res.status(400).json({error: "Faltando Dados"});
    };

    try{
        const usuario = await updateUsuario(id, nome, email, senhaHash, cidade, estado, dataNasc, imgPerfil);
        return res.status(200).json(usuario);
    }catch(error){
        if(error.message === "Usuário não encontrado"){
            return res.status(404).json({error: "Usuário não encontrado"})
        }
        return res.status(500).json({error: error.message});
    }
};

const deleteUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        await deleteUsuario(id);
        return res.status(204).send()
    }catch(error) {
        if (error.message === "Usuário não encontrado") {
            return res.status(404).json({error: "Usuário não encontrado"});
        }
        return res.status(500).json({error: error.message});
    };
};

module.exports = {
    getAllUsariosHandler,
    getUsuarioByIdHandler,
    createUsuarioHandler,
    updateUsuarioHandler,
    deleteUsuarioHandler
};