const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router
    .route('/')
    .post(userController.createUser)
    .get(userController.getAllUsers)

router
    .route('/:userId')
    .get(userController.getUserById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById)

router
    .route('/:userId/chatbots')
    .post(userController.createChatBot)
    .get(userController.getAllChatBots)

module.exports = router