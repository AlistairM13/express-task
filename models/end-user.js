const { Model, DataTypes } = require("sequelize")
const sequelize = require('../db/db')

class EndUser extends Model {
}

EndUser.init({
    endUserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "EndUser",
    timestamps: false
})


module.exports = EndUser