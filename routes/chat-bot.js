const express = require('express')
const chatBotController = require('../controllers/chat-bot-controller')

const router = express.Router()

router.get("/search", chatBotController.searchChatBot)

router
    .route("/:chatbotId")
    .get(chatBotController.getChatBotById)
    .put(chatBotController.updateChatBot)
    .delete(chatBotController.deleteChatBot)

router
    .route("/:chatbotId/conversations")
    .post(chatBotController.createConversation)
    .get(chatBotController.getConversation)

module.exports = router