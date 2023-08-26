const express = require('express')
const Conversation = require('../models/conversation')
const router = express.Router()

router
    .route("/:conversationId")
    .get(async (req, res) => {
        try {
            const cId = req.params.conversationId

            const conversation = await Conversation.findOne({ where: { conversationId: cId } })
            if (!conversation) return res.status(404).json({ message: "Conversation not found" })

            res.status(200).json(conversation)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .put(async (req, res) => {
        try {
            const cId = req.params.conversationId

            const conversation = await Conversation.findOne({ where: { conversationId: cId } })
            if (!conversation) return res.status(404).json({ message: "Conversation not found" })

            // Decision to not alter the text taken since the bot would have already responed to that message
            conversation.status = "Complete"
            await conversation.save()
            res.status(200).json(conversation)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .delete(async (req, res) => {
        try {
            const cId = req.params.conversationId

            const conversation = await Conversation.findOne({ where: { conversationId: cId } })
            if (!conversation) return res.status(404).json({ message: "Conversation not found" })

            await Conversation.destroy({ where: { conversationId: cId } })
            res.status(200).json({ message: "Conversation message deleted" })
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

module.exports = router