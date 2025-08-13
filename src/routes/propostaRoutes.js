const express = require('express');
const router = express.Router();
const {getAllPropostasHandler, getPropostaByIdHandler, createPropostaHandler, updatePropostaHandler, deletePropostaHandler} = require('../controller/propostaController');

router.get('/', getAllPropostasHandler);
router.get('/:id', getPropostaByIdHandler);
router.post('/', createPropostaHandler);
router.put('/:id', updatePropostaHandler);
router.delete('/:id', deletePropostaHandler);

module.exports = router;