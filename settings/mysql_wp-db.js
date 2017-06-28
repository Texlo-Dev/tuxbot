const Sequelize = require('sequelize')
const dir = '/home/richrancy/tuxbot'
const config = require('../config.json')
module.exports = {
 Sequelize: require('sequelize'),
 dir: '/home/richrancy/tuxbot',
 config: require(`${dir}/config.json`),
 warnpoints: new Sequelize('tuxbot', 'tux', config.sqlPass, {
  dialect: 'mysql',
 
  host: 'localhost',

  logging: false
 })
};
