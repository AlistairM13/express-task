const { Sequelize } = require('sequelize')

const sequelize = new Sequelize("test-db", "user", "password", {
    dialect: 'sqlite',
    host: './db/db.sqlite'
})

module.exports = sequelize