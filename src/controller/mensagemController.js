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

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    }

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

    if (conteudo.trim() === '') {
        return res.status(400).json({ error: "O conteúdo da mensagem não pode ser vazio." });
    }

    if (isNaN(usuarioId) || isNaN(chatId)) {
        return res.status(400).json({ error: "IDs de usuário ou chat inválidos." });
    }

    try {
        const mensagem = await createMensagem(req.body);
        return res.status(201).json(mensagem);
    } catch (error) {
         if (error.code === 'P2025') {
            return res.status(404).json({ error: "Usuário ou chat não encontrados." });
        }
        return res.status(500).json({ error: error.message});
    }
};

const updateMensagemHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosParaAtualizar = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    }
    
    if (Object.keys(dadosParaAtualizar).length === 0) {
        return res.status(400).json({ error: "Nenhum dado fornecido para atualização." });
    }

    const testeValoresVazios = Object.values(dadosParaAtualizar).some(dados => {
        return typeof dados === 'string' && dados.trim() === '';
    });

    if(testeValoresVazios){
        return res.status(400).json({ error : "Não pode conter campos vazios"});
    };
    
    try {
        const mensagem = await updateMensagem(id, dadosParaAtualizar);
        return res.status(200).json(mensagem);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Mensagem não encontrada"});
        }
        return res.status(500).json({ error: error.message});
    }
};

const deleteMensagemHandler = async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido."});
    }

    try {
        await deleteMensagem(id);
        return res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
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