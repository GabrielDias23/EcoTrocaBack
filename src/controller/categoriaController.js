const {getAllCategoria, getCategoriaById, createCategoria, updateCategoria, deleteCategoria} = require('../models/categoriaModel');

const getAllCategoriaHandler = async(req, res) => {
    try{
        const categoria = await getAllCategoria();
        return res.status(200).json(categoria);
    }catch(error){
        return res.status(500).json({error: error.message});
    };
};

const getCategoriaByIdHandler = async(req, res) => {
    const id = parseInt(req.params.id);
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

    if(!nome) {
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

    if (!nome) {
        return res.status(400).json({error: "Faltando Dados"});
    };

    try{
        const categoria = await updateCategoria(id, nome);
        return res.status(200).json(categoria);
    }catch(error){
        if(error.message === "Categoria não encontrada"){
            return res.status(404).json({error: "Categoria não encontrada"});
        }
        return res.status(500).json({error: error.message});
    };
};

const deleteCategoriaHandler = async(req, res) => {
    const id = parseInt(req.params.id);

    try{
        await deleteCategoria(id);
        res.status(204).send();
    }catch(error) {
        if (error.message === "Categoria não encontrada") {
            res.status(404).json({error: "Categoria não encontrada"});
        }
        return res.status(500).json({error: errror.message});
    };
};

module.exports = {
    getAllCategoriaHandler,
    getCategoriaByIdHandler,
    createCategoriaHandler,
    updateCategoriaHandler,
    deleteCategoriaHandler
};