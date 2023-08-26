const express = require('express')
const User = require('../models/user')
const ChatBot = require('../models/chat-bot')

const router = express.Router()

router
    .route('/')
    .post(async (req, res) => {
        const { username, email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: "Email and password are required" })
        const existingUser = await User.findOne({ where: { email: req.body.email } })

        if (!existingUser) {
            if (!username) return res.status(400).json({ message: "Username is required for account creation" })

            await User.create({
                username: username,
                email: email,
                password: password
            })
            return res.status(201).json({ message: "User Registered" })
        }
        if (existingUser.password == req.body.password) {
            return res.status(200).json({ message: "User Logged in" })
        }
        res.status(400).json({ message: "User already exists, if this is you, please enter the right password" })
    })
    .get(async (req, res) => {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

router
    .route('/:userId')
    .get(async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findOne({ where: { userId: userId } })
            if (!user) return res.status(404).json({ message: "User not found" })
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .put(async (req, res) => {
        try {
            const { username, email, password } = req.body
            if (!username || !email || !password) return res.status(400).json({ message: "Please make sure username, email and password are entered" })

            const user = await User.findOne({ where: { userId: req.params.userId } })
            if (!user) return res.status(404).json({ message: "User not found" })

            user.username = username
            user.email = email
            user.password = password
            await user.save()
            res.status(200).json(user)
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .delete(async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findOne({ where: { userId: userId } })
            if (!user) return res.status(404).json({ message: "User not found" })

            await User.destroy({ where: { userId: userId } })
            res.status(200).json({ message: "User deleted" })
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

router
    .route('/:userId/chatbots')
    .post(async (req, res) => {
        try {
            const userId = req.params.userId
            const name = req.body.name
            if (!name) return res.status(400).json({ message: "Chatbot name is required" })

            // If user doesnt exist
            const user = await User.findOne({ where: { userId: userId } })
            if (!user) return res.status(404).json({ message: "User not found" })

            // Same user created multiple bots of the same name
            const existingBot = await ChatBot.findOne({ where: { name: name, userId: userId } })
            if (existingBot) return res.status(400).json({ message: "You have already created a bot by that same name, please delete it or use a different name" })

            await ChatBot.create({
                userId: userId,
                name: name
            })
            res.status(201).json({ message: "bot created" })
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .get(async (req, res) => {
        try {
            const userId = req.params.userId
            const user = await User.findOne({ where: { userId: userId } })
            if (!user) return res.status(404).json({ message: "User not found" })

            const bots = await ChatBot.findAll({ where: { userId: userId } })
            res.status(201).json(bots)
        } catch (e) {
            res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

module.exports = router