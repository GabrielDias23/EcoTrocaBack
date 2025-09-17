const express = require('express');
const router = express.Router();
const { getAllUsariosHandler, getUsuarioByIdHandler, createUsuarioHandler, updateUsuarioHandler, deleteUsuarioHandler } = require('../controller/usuarioController');
const { requireAuth } = require('../middlewares/auth')

router.get('/', requireAuth, getAllUsariosHandler);
router.get('/:id', getUsuarioByIdHandler);
router.post('/', createUsuarioHandler);
router.put('/:id', updateUsuarioHandler);
router.delete('/:id', deleteUsuarioHandler);

module.exports = router;