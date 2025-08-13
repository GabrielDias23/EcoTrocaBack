const express = require('express');
const router = express.Router();
const {getAllCategoriaHandler, getCategoriaByIdHandler, createCategoriaHandler, updateCategoriaHandler, deleteCategoriaHandler} = require('../controller/categoriaController');

router.get('/', getAllCategoriaHandler);
router.get('/:id', getCategoriaByIdHandler);
router.post('/', createCategoriaHandler);
router.put('/:id', updateCategoriaHandler);
router.delete('/:id', deleteCategoriaHandler);

module.exports = router;