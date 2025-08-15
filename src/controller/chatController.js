const {getAllChats, getChatById, createChat, deleteChat,} = require('../models/chatModel');

const getAllChatsHandler = async (req, res) => {
    try {
        const chat = await getAllChats();
        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    };
};

const getChatByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

     if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    };

    try {
        const chat = await getChatById(id);

        if (!chat) {
            return res.status(404).json({ error: "Chat não encontrado." });
        };

        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    };
};

const createChatHandler = async (req, res) => {
    const { propostaId } = req.body;

    if (!propostaId) {
        return res.status(400).json({ error: "O ID da proposta é obrigatório para criar um chat."});
    };

    if (isNaN(propostaId)) {
        return res.status(400).json({ error: "ID de proposta inválido." });
    };

    try {
        const chat = await createChat(propostaId);
        return res.status(201).json(chat);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Proposta não encontrada"})
        }
        return res.status(500).json({ error: error.message});
    };
};

const deleteChatHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    };

    try {
        await deleteChat(id);
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Chat não encontrado"});
        }
        return res.status(500).json({ error: error.message});
    };
};

module.exports = {
    getAllChatsHandler,
    getChatByIdHandler,
    createChatHandler,
    deleteChatHandler,
};