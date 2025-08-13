const { getAllItens, getItemById, createItem, updateItem, deleteItem} = require('../models/itemModel');

const getAllItensHandler = async (req, res) => {
    try {
        const itens = await getAllItens();
        return res.status(200).json(itens);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

const getItemByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const item = await getItemById(id);

        if (!item) {
            return res.status(404).json({ error: "Item não encontrado." });
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message});
    }
};


const createItemHandler = async (req, res) => {
    const { nome, descricao, usuarioId, categoriaId, cidade, estado, imagem } = req.body;

    if (!nome || !descricao || !usuarioId || !categoriaId) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        const item = await createItem(nome, descricao, usuarioId, categoriaId, cidade, estado, imagem);
        return res.status(201).json(item);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const updateItemHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;

    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    delete dadosParaAtualizar.id;
    delete dadosParaAtualizar.usuarioId;
    delete dadosParaAtualizar.categoriaId;
    delete dadosParaAtualizar.dataPublicacao;

    try {
        const item = await updateItem(id, dadosParaAtualizar);
        return res.status(200).json(item);
    } catch (error) {
        if (error.message === "Item não encontrado") {
            return res.status(404).json({ error: "Item não encontrado"});
        }
        return res.status(500).json({ error: error.message});
    }
};


const deleteItemHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await deleteItem(id);
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        if (error.message === "Item não encontrado") {
            return res.status(404).json({ error: "Item não encontrado"});
        }
        return res.status(500).json({ error: error.message});
    }
};

module.exports = {
    getAllItensHandler,
    getItemByIdHandler,
    createItemHandler,
    updateItemHandler,
    deleteItemHandler
};