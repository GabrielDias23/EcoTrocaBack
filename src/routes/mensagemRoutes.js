const express = require('express');
const router = express.Router();
const {getAllMensagemHandler, getMensagemByIdHandler, createMensagemHandler, updateMensagemHandler, deleteMensagemHandler} = require('../controller/mensagemController');

router.get('/', getAllMensagemHandler);
router.get('/:id', getMensagemByIdHandler);
router.post('/', createMensagemHandler);
router.put('/:id', updateMensagemHandler);
router.delete('/:id', deleteMensagemHandler);

module.exports = router;