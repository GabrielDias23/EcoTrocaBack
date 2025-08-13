const express = require('express');
const router = express.Router();
const {getAllChatsHandler, getChatByIdHandler, createChatHandler, deleteChatHandler,} = require('../controller/chatController');

router.get('/', getAllChatsHandler);
router.get('/:id', getChatByIdHandler);
router.post('/', createChatHandler);
router.delete('/:id', deleteChatHandler);

module.exports = router;