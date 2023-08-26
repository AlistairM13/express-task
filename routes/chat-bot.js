const express = require('express')
const ChatBot = require('../models/chat-bot')
const Conversation = require('../models/conversation')
const EndUser = require('../models/end-user')
const { Op } = require('sequelize')

const router = express.Router()

router.get("/search", async (req, res) => {
    try {
        const name = req.query.name
        if (!name) return res.status(400).json({ message: "Name not entered" })

        const users = await ChatBot.findAll({
            where: {
                name: {
                    [Op.substring]: name
                }
            }
        })
        res.status(200).json(users)
    } catch (e) {
        return res.status(500).json({ message: e.message || "Something went wrong" })
    }
})

router
    .route("/:chatbotId")
    .get(async (req, res) => {
        try {
            const botId = req.params.chatbotId

            const bot = await ChatBot.findOne({ where: { botId: botId } })
            if (!bot) return res.status(404).json({ message: "Chatbot not found" })

            res.status(200).json(bot)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .put(async (req, res) => {
        try {
            const botId = req.params.chatbotId
            const name = req.body.name
            if (!name) return res.status(400).json({ message: "Updated name for the chatbot required" })

            const bot = await ChatBot.findOne({ where: { botId: botId } })
            if (!bot) return res.status(404).json({ message: "Chatbot not found" })

            bot.name = name
            await bot.save()
            res.status(200).json(bot)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .delete(async (req, res) => {
        try {
            const botId = req.params.chatbotId

            const bot = await ChatBot.findOne({ where: { botId: botId } })
            if (!bot) return res.status(404).json({ message: "Chatbot not found" })

            await ChatBot.destroy({ where: { botId: botId } })
            res.status(200).json({ message: "Chatbot deleted" })
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

router
    .route("/:chatbotId/conversations")
    .post(async (req, res) => {
        try {
            const botId = req.params.chatbotId
            const userEmail = req.body.email
            if (!userEmail) return res.status(400).json({ message: "Email of the end user is required" })

            const text = req.body.text
            if (!text) return res.status(400).json({ message: "No conversation text provided" })

            const user = await EndUser.findOne({ where: { email: userEmail } })
            if (!user) return res.status(404).json({ message: "No end user found with this email" })

            const bot = await ChatBot.findOne({ where: { botId: botId } })
            if (!bot) return res.status(404).json({ message: "Chatbot not found" })

            const message = await Conversation.create({
                text: text,
                botId: botId,
                endUserId: user.endUserId
            })
            res.status(201).json(message)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .get(async (req, res) => {
        try {
            const botId = req.params.chatbotId

            const bot = await ChatBot.findOne({ where: { botId: botId } })
            if (!bot) return res.status(404).json({ message: "Chatbot not found" })

            const conversation = await Conversation.findAll({ where: { botId: botId } })
            res.status(201).json(conversation)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

module.exports = router