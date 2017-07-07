const Sequelize = require('sequelize')
const dir = '/home/richrancy/tuxbot'
const config = require('../config.json')
module.exports = {
 Sequelize: require('sequelize'),
 warnpoints: new Sequelize('tuxbot', 'tux', config.sqlPass, {
  dialect: 'mysql',
 
  host: 'localhost',

  logging: false
 })
};

module.exports.warnpoints.authenticate()
  .then(() => {
    console.log('Warnpoints database ready.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL.', err);
  });


