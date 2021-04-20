//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Plant = require('./models/plant')


//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Plant
  },
}
