const express = require('express')
const EndUser = require('../models/end-user')
const router = express.Router()
const { Op } = require('sequelize')


router
    .route("/")
    .post(async (req, res) => {
        try {
            const { name, email } = req.body
            if (!name || !email) res.status(400).json({ message: "Name and email required" })

            const existingUser = await EndUser.findOne({ where: { email: email } })
            if (existingUser) return res.status(400).json({ message: "A user with that email already exists" })

            const user = await EndUser.create({
                name: name,
                email: email
            })
            res.status(201).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .get(async (req, res) => {
        try {
            const users = await EndUser.findAll()
            res.status(200).json(users)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })


router.get("/search", async (req, res) => {
    try {
        const name = req.query.name
        if (!name) return res.status(400).json({ message: "Name is required" })

        const users = await EndUser.findAll({
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
    .route("/:endUserId")
    .get(async (req, res) => {
        try {
            const userId = req.params.endUserId

            const user = await EndUser.findOne({ where: { endUserId: userId } })
            if (!user) return res.status(404).json({ message: "End User not found" })

            res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .put(async (req, res) => {
        try {
            const { name, email } = req.body
            if (!name || !email) res.status(400).json({ message: "Name and email required" })

            const userId = req.params.endUserId

            const user = await EndUser.findOne({ where: { endUserId: userId } })
            if (!user) return res.status(404).json({ message: "End User not found" })

            user.name = name
            user.email = email
            await user.save()
            res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })
    .delete(async (req, res) => {
        try {
            const userId = req.params.endUserId

            const user = await EndUser.findOne({ where: { endUserId: userId } })
            if (!user) return res.status(404).json({ message: "End User not found" })

            await EndUser.destroy({ where: { endUserId: userId } })
            res.status(200).json({ message: "End user deleted" })
        } catch (e) {
            return res.status(500).json({ message: e.message || "Something went wrong" })
        }
    })

module.exports = router