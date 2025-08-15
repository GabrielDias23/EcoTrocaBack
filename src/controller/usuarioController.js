const {getAllUsuarios,getUsuarioById,createUsuario,updateUsuario,deleteUsuario} = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

const getAllUsariosHandler = async (req, res) => {
    try{
        const usuarios = await getAllUsuarios();
        return res.status(200).json(usuarios);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const getUsuarioByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({error: "ID inválido"});  
    };

    try{
        const usuario = await getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const {senhaHash: _, ...dadosUsuario} = usuario;
        return res.status(200).json(dadosUsuario);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const createUsuarioHandler = async (req, res) => {
    const dadosUsuario = req.body;

    if (!dadosUsuario.nome || !dadosUsuario.email || !dadosUsuario.senha) {
        return res.status(400).json({error: "Nome, email e senha são obrigatórios"});
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosUsuario.email)) {
        return res.status(400).json({error: "Formato do email inválido"});
    };

    if (dadosUsuario.senha.length < 6) {
        return res.status(400).json({error: "A senha deve ter no mínimo 6 caracteres"});
    };

    try{
        const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);
        delete dadosUsuario.senha;
        dadosUsuario.senhaHash = senhaHash;

        const novoUsuario = await createUsuario(dadosUsuario);
        const { senhaHash: _, ...dados} = novoUsuario;
        return res.status(201).json(dados);
    }catch(error){
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return res.status(409).json({error: "Email já cadastrado"});
        }
        return res.status(500).json({error: error.message});
    };

};

const updateUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;

    if(isNaN(id)){
      return res.status(400).json({error: "ID inválido"});  
    };

    if(Object.keys(dadosParaAtualizar).length === 0){
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    };

    const testeValoresVazios = Object.values(dadosParaAtualizar).some(dados => {
        return typeof dados === 'string' && dados.trim() === '';
    });

    if(testeValoresVazios){
      return res.status(400).json({error : "Não pode conter campos vazios"});
    };

    if(dadosParaAtualizar.senha){
        dadosParaAtualizar.senhaHash = await bcrypt.hash(dadosParaAtualizar.senha, 10);
        delete dadosParaAtualizar.senha;
    };

    try{
        const usuario = await updateUsuario(id, dadosParaAtualizar);

        const {senhaHash: _, ...dadosUsuario} = usuario;
        return res.status(200).json(dadosUsuario);
    }catch(error){
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Usuário não encontrado"});
        }
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return res.status(409).json({ error: "Email já cadastrado" });
        }
        return res.status(500).json({error: error.message});
    }
};

const deleteUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)){
      return res.status(400).json({error: "ID inválido"});  
    };

    try{
        await deleteUsuario(id);
        return res.status(204).send()
    }catch(error) {
        if (error.code === 'P2025') {
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