const Sequelize = require('sequelize')
const dir = '/home/richrancy/tuxbot'
const config = require('../config.json')
module.exports = {
 Sequelize: require('sequelize'),
 dir: '/home/richrancy/tuxbot',
 config: require(`${dir}/config.json`),
 cases:  new Sequelize({
  dialect: 'sqlite',
 
  storage: './sqlite/cases.sqlite',

  logging: false
 })
};

