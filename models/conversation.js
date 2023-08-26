const { Model, DataTypes } = require("sequelize")
const sequelize = require('../db/db')

class Conversation extends Model {
}

Conversation.init({
    conversationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Ongoing"
    },
    botId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endUserId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Conversation",
    timestamps: false
})
const ChatBot = require('../models/chat-bot')
const EndUser = require('../models/end-user')

ChatBot.hasMany(Conversation, { foreignKey: "botId" })
Conversation.belongsTo(ChatBot, { foreignKey: "botId" })
Conversation.belongsTo(EndUser, {foreignKey: 'endUserId'})

module.exports = Conversation