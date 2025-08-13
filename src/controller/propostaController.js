const {getAllPropostas, getPropostaById, createProposta, updateProposta, deleteProposta} = require('../models/propostaModel'); // Importa as funções da model

const getAllPropostasHandler = async (req, res) => {
    try {
        const propostas = await getAllPropostas();
        return res.status(200).json(propostas);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const getPropostaByIdHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const proposta = await getPropostaById(id);

        if(!proposta){
            return res.status(404).json({ error: "Proposta não encontrada."});
        }

        return res.status(200).json(proposta);
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
};

const createPropostaHandler = async (req, res) => {
    const { autorId, itemOferecidoId, itemDesejadoId } = req.body;

    if(!autorId || !itemOferecidoId || !itemDesejadoId){
        return res.status(400).json({ error: "Campos obrigatórios ausentes: autorId, itemOferecidoId, itemDesejadoId." });
    }

    try{
        const novaProposta = await createProposta(autorId, itemOferecidoId, itemDesejadoId);
        return res.status(201).json(novaProposta);
    }catch (error){
        return res.status(500).json({ error: error.message});
    }
};

const updatePropostaHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;

    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização."});
    }

    delete dadosParaAtualizar.id;
    delete dadosParaAtualizar.autorId;
    delete dadosParaAtualizar.dataProposta;
    delete dadosParaAtualizar.itemOferecidoId;
    delete dadosParaAtualizar.itemDesejadoId;

    try {
        const propostaAtualizada = await updateProposta(id, dadosParaAtualizar);
        return res.status(200).json(propostaAtualizada);
    } catch (error) {
        if (error.message === "Proposta não encontrada") {
            return res.status(404).json({ error: "Prosposta nao encontrada"});
        }
        return res.status(500).json({ error: error.message});
    }
};

const deletePropostaHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await deleteProposta(id);
        return res.status(204).send(); // Retorna 204 No Content para deleção bem-sucedida
    } catch (error) {
        console.error(error);
        if (error.message === "Proposta não encontrada") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Erro ao deletar a proposta.' });
    }
};

module.exports = {
    getAllPropostasHandler,
    getPropostaByIdHandler,
    createPropostaHandler,
    updatePropostaHandler,
    deletePropostaHandler
};