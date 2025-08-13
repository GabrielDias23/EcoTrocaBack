const {getAllMensagem, getMensagemById, createMensagem, updateMensagem, deleteMensagem,} = require('../models/mensagemModel');

const getAllMensagemHandler = async (req, res) => {
    try {
        const mensagem = await getAllMensagem();
        return res.status(200).json(mensagem);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const getMensagemByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const mensagem = await getMensagemById(id);

        if (!mensagem) {
            return res.status(404).json({ error: "Mensagem não encontrada."});
        }

        return res.status(200).json(mensagem);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const createMensagemHandler = async (req, res) => {
    const { conteudo, usuarioId, chatId } = req.body;

    if (!conteudo || !usuarioId || !chatId) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes: conteudo, usuarioId, chatId."});
    }

    try {
        const mensagem = await createMensagem(conteudo, usuarioId, chatId);
        return res.status(201).json(mensagem);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const updateMensagemHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;
    
    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    delete dadosParaAtualizar.id;
    delete dadosParaAtualizar.usuarioId;
    delete dadosParaAtualizar.chatId;
    delete dadosParaAtualizar.dataHora;
    
    try {
        const mensagem = await updateMensagem(id, dadosParaAtualizar);
        return res.status(200).json(mensagem);
    } catch (error) {
        if (error.message === "Mensagem não encontrada") {
            return res.status(404).json({ error: "Mensagem não encontrada"});
        }
        return res.status(500).json({ error: error.message});
    }
};

const deleteMensagemHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await deleteMensagem(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === "Mensagem não encontrada") {
            return res.status(404).json({ error: "Mensagem não encontrada"});
        }
        return res.status(500).json({ error: error.message});
    }
};

module.exports = {
    getAllMensagemHandler,
    getMensagemByIdHandler,
    createMensagemHandler,
    updateMensagemHandler,
    deleteMensagemHandler
};