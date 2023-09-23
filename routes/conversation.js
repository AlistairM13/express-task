const express = require('express')
const conversationController = require('../controllers/conversation-controller')
const router = express.Router()

router
    .route("/:conversationId")
    .get(conversationController.getConversationById)
    .put(conversationController.updateConversationById)
    .delete(conversationController.deleteConversationById)

module.exports = router