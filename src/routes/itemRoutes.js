const express = require('express');
const router = express.Router();
const {getAllItensHandler, getItemByIdHandler, createItemHandler, updateItemHandler, deleteItemHandler, getItensByUsuarioHandler} = require('../controller/ItemController');

router.get('/', getAllItensHandler);
router.get('/:id', getItemByIdHandler);
router.get('/usuario/:id', getItensByUsuarioHandler);
router.post('/', createItemHandler);
router.put('/:id', updateItemHandler);
router.delete('/:id', deleteItemHandler);

module.exports = router;