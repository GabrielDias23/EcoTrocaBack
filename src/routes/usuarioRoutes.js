const express = require('express');
const router = express.Router();
const { getAllUsariosHandler, getUsuarioByIdHandler, createUsuarioHandler, updateUsuarioHandler, deleteUsuarioHandler, getUsuarioPerfilHandler } = require('../controller/usuarioController');
const { requireAuth } = require('../middlewares/auth')

router.get('/',  requireAuth, getAllUsariosHandler);
router.get('/:id', getUsuarioByIdHandler);
router.post('/', createUsuarioHandler);
router.put('/:id', updateUsuarioHandler);
router.delete('/:id', deleteUsuarioHandler);
router.get('/perfil', requireAuth, getUsuarioPerfilHandler);

module.exports = router;