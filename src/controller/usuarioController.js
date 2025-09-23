const { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const getAllUsariosHandler = async (req, res) => {
    try {
        const usuarios = await getAllUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

const getUsuarioPerfilHandler = async (req, res) => {
    const usuarioId = req.userId;
    console.log("ID recebido no controller:", usuarioId);
    console.log("Tipo de dado do ID:", typeof usuarioId);

    const usuario = await getUsuarioById(usuarioId);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const { senhaHash, ...usuarioSemSenha } = usuario;

    return res.json(usuarioSemSenha);
}

const getUsuarioByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    };

    try {
        const usuario = await getUsuarioById(id);

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const { senhaHash: _, ...dadosUsuario } = usuario;
        return res.status(200).json(dadosUsuario);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

const createUsuarioHandler = async (req, res) => {
    const { nome, email, senha, cidade, estado, dataNasc, imgPerfil, tipoUsuario } = req.body;

    if (!nome || !email || !senha || !cidade || !estado || !dataNasc) {
        return res.status(400).json({ error: "Nome, email, senha, cidade, estado e data de nascimento são obrigatórios." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato do email inválido." });
    }

    if (senha.length < 6) {
        return res.status(400).json({ error: "A senha deve ter no mínimo 6 caracteres." });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNasc)) {
        return res.status(400).json({ error: "Data de nascimento inválida. Use o formato YYYY-MM-DD." });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        const dadosParaCriar = {
            nome,
            email,
            senhaHash,
            cidade,
            estado,
            dataNasc: new Date(dataNasc),
            imgPerfil,
            tipoUsuario
        };

        const novoUsuario = await createUsuario(dadosParaCriar);

        const { senhaHash: _, ...dados } = novoUsuario;
        return res.status(201).json(dados);

    } catch (error) {
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return res.status(409).json({ error: "Email já cadastrado" });
        }
        return res.status(500).json({ error: "Erro ao criar usuário: " + error.message });
    }
};

const updateUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const { senha, ...dadosAtualizacao } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (Object.keys(dadosAtualizacao).length === 0 && !senha) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    const testeValoresVazios = Object.values(dadosAtualizacao).some(dado => {
        return typeof dado === 'string' && dado.trim() === '';
    });

    if (testeValoresVazios) {
        return res.status(400).json({ error: "Não pode conter campos vazios." });
    }

    if (senha) {
        const senhaHash = await bcrypt.hash(senha, 10);
        dadosAtualizacao.senhaHash = senhaHash;
    }

    try {
        const usuario = await updateUsuario(id, dadosAtualizacao);
        const { senhaHash: _, ...dadosUsuario } = usuario;
        return res.status(200).json(dadosUsuario);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        if (error.code === 'P2002' && error.meta.target.includes('email')) {
            return res.status(409).json({ error: "Email já cadastrado" });
        }
        return res.status(500).json({ error: error.message });
    }
};

const deleteUsuarioHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    };

    try {
        await deleteUsuario(id);
        return res.status(204).send()
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(500).json({ error: error.message });
    };
};

module.exports = {
    getAllUsariosHandler,
    getUsuarioByIdHandler,
    createUsuarioHandler,
    updateUsuarioHandler,
    deleteUsuarioHandler,
    getUsuarioPerfilHandler
};