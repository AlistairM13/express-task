const { Model, DataTypes } = require("sequelize")
const sequelize = require('../db/db')

class ChatBot extends Model {
}

ChatBot.init({
    botId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    }

}, {
    sequelize,
    modelName: "ChatBot",
    timestamps: false
})
const User = require('../models/user')

User.hasMany(ChatBot, { foreignKey: "userId" })
ChatBot.belongsTo(User, { foreignKey: "userId" })

module.exports = ChatBot