const { Model, DataTypes } = require("sequelize")
const sequelize = require('../db/db')

class User extends Model {
}

User.init({
    userId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: "User",
    timestamps:false
})

module.exports = User