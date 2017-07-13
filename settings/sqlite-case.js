const Sequelize = require('sequelize')
const config = require('../config.json')
module.exports = {
 Sequelize: require('sequelize'),
 cases:  new Sequelize({
  dialect: 'sqlite',
 
  storage: './sqlite/cases.sqlite',

  logging: false
 })
};

