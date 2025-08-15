const {getAllCategoria, getCategoriaById, createCategoria, updateCategoria, deleteCategoria} = require('../models/categoriaModel');

const getAllCategoriaHandler = async(req, res) => {
    try{
        const categorias = await getAllCategoria();
        return res.status(200).json(categorias);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const getCategoriaByIdHandler = async(req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({error: "ID inválido."});
    };

    try{
        const categoria = await getCategoriaById(id);

        if (!categoria) {
            return res.status(404).json({ error: "Categoria não encontrada"});
        };

        return res.status(200).json(categoria);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const createCategoriaHandler = async(req, res) => {
    const {nome} = req.body;

    if(!nome || nome.trim() === '') {
        return res.status(400).json({error: "Faltando Dados"});
    }

    try{
        const categoria = await createCategoria(nome);
        return res.status(201).json(categoria);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const updateCategoriaHandler = async(req, res) => {
    const id = parseInt(req.params.id);
    const {nome} = req.body;

    if (isNaN(id)) {
        return res.status(400).json({error: "ID inválido."});
    };

    if (!nome || nome.trim() === '') {
        return res.status(400).json({error: "Faltando Dados"});
    };

    try{
        const categoria = await updateCategoria(id, nome);
        return res.status(200).json(categoria);
    }catch(error){
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Categoria não encontrada"});
        }
        return res.status(500).json({error: error.message});
    };
};

const deleteCategoriaHandler = async(req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({error: "ID inválido."});
    }

    try{
        await deleteCategoria(id);
        return res.status(204).send();
    }catch(error) {
        if (error.code === 'P2025') {
            return res.status(404).json({error: "Categoria não encontrada"});
        }
        return res.status(500).json({error: error.message});
    };
};

module.exports = {
    getAllCategoriaHandler,
    getCategoriaByIdHandler,
    createCategoriaHandler,
    updateCategoriaHandler,
    deleteCategoriaHandler
};