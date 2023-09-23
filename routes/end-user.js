const express = require('express')
const router = express.Router()
const endUserController = require('../controllers/end-user-controller')

router
    .route("/")
    .post(endUserController.createEndUser)
    .get(endUserController.getAllEndUsers)


router.get("/search",endUserController.searchEndUser)

router
    .route("/:endUserId")
    .get(endUserController.getEndUserById)
    .put(endUserController.updateEndUserById)
    .delete(endUserController.deleteEndUserById)

module.exports = router