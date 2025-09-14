const { getAllItens, getItemById, createItem, updateItem, deleteItem} = require('../models/itemModel');
const fs = require('fs').promises;
const path = require('path');

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

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
    };

    try {
        const item = await getItemById(id);

        if (!item) {
            return res.status(404).json({ error: "Item não encontrado." });
        }

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    };
};

const createItemHandler = async (req, res) => {
    const { nome, descricao, categoriaId, usuarioId, imagemBase64, cidade, estado } = req.body;

    if (!nome || !descricao || !categoriaId || !usuarioId) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    try {
        let urlImagem = null;
        if (imagemBase64) {
            const base64Data = imagemBase64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            const filename = `${Date.now()}-${usuarioId}.jpeg`;
            
            // Alteração chave: Usa path.join para criar um caminho absoluto,
            // garantindo que o arquivo seja salvo na pasta 'uploads' do projeto
            const imagePath = path.join(__dirname, '..', 'uploads', filename);
            await fs.writeFile(imagePath, base64Data, 'base64');
            
            urlImagem = `/uploads/${filename}`;
        }
        
        const dadosParaCriar = {
            nome,
            descricao,
            categoriaId: parseInt(categoriaId),
            usuarioId: parseInt(usuarioId),
            imagem: urlImagem, 
            cidade: cidade || null,
            estado: estado || null,
        };

        const novoItem = await createItem(dadosParaCriar);

        return res.status(201).json(novoItem);
    } catch (error) {
        console.error("Erro ao criar item:", error);
        return res.status(500).json({ error: "Falha ao criar item. " + error.message });
    }
};


const updateItemHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
    }

    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    const testeValoresVazios = Object.values(dadosParaAtualizar).some(dados => {
        return typeof dados === 'string' && dados.trim() === '';
    });

    if(testeValoresVazios){
      return res.status(400).json({error : "Não pode conter campos vazios"});
    };

    try {
        const item = await updateItem(id, dadosParaAtualizar);
        return res.status(200).json(item);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Item não encontrado"})
        }
        return res.status(500).json({ error: error.message});
    }
};


const deleteItemHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido." });
    }

    try {
        await deleteItem(id);
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Item não encontrado."})
        }
        return res.status(500).json({ error: error.message});
    };
};


module.exports = {
    getAllItensHandler,
    getItemByIdHandler,
    createItemHandler,
    updateItemHandler,
    deleteItemHandler
};