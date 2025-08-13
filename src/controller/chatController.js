const {getAllChats, getChatById, createChat, deleteChat,} = require('../models/chatModel');

const getAllChatsHandler = async (req, res) => {
    try {
        const chat = await getAllChats();
        return res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message});
    }
};

const getChatByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const chat = await getChatById(id);

        if (!chat) {
            return res.status(404).json({ error: "Chat não encontrado." });
        }

        return res.status(200).json(chat);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const createChatHandler = async (req, res) => {
    const { propostaId } = req.body;

    if (!propostaId) {
        return res.status(400).json({ error: "O ID da proposta é obrigatório para criar um chat."});
    }

    try {
        const chat = await createChat(propostaId);
        return res.status(201).json(chat);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const deleteChatHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await deleteChat(id);
        return res.status(204).send();
    } catch (error) {
        if (error.message === "Chat não encontrado") {
            return res.status(404).json({ error: "Chat não encontrado"});
        }
        return res.status(500).json({ error: error.message});
    }
};

module.exports = {
    getAllChatsHandler,
    getChatByIdHandler,
    createChatHandler,
    deleteChatHandler,
};