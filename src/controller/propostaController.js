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

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    }

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

    if(isNaN(autorId) || isNaN(itemOferecidoId) || isNaN(itemDesejadoId)){
        return res.status(400).json({ error: "IDs inválidos." });
    }

    try{
        const novaProposta = await createProposta(req.body);
        return res.status(201).json(novaProposta);
    }catch (error){
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Autor, itemOferecido ou itemDesejado não encontrados." });
        }
        return res.status(500).json({ error: error.message});
    }
};

const updatePropostaHandler = async (req, res) => {
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
        const propostaAtualizada = await updateProposta(id, dadosParaAtualizar);
        return res.status(200).json(propostaAtualizada);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Prosposta não encontrada"});
        }
        return res.status(500).json({ error: error.message});
    }
};

const deletePropostaHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    }

    try {
        await deleteProposta(id);
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Proposta não encontrada"});
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