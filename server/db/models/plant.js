const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  species: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
  },
  imageURL: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Plant
