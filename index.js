const express = require('express')
const app = express()
const sequelize = require("./db/db")
const userRouter = require('./routes/users')
const chatBotRouter = require('./routes/chat-bot')
const conversationRouter = require('./routes/conversation')
const endUserRouter = require('./routes/end-user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/users', userRouter)
app.use('/api/chatbots', chatBotRouter)
app.use('/api/conversations', conversationRouter)
app.use('/api/endusers', endUserRouter)

sequelize.sync().then(() => {
    console.log("db ready")
    app.listen(3000, ()=>{
        console.log("server ready at port 3000")
    })
})


