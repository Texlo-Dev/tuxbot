const Sequelize = require('sequelize')
const config = require('../config.json')
module.exports = {
 Sequelize: require('sequelize'),
 cases:  new Sequelize('tuxbot', 'tux', config.sqlPass, {
  dialect: 'mysql',
 
  host: 'localhost',

  logging: false
 })
};
module.exports.cases.authenticate()
  .then(() => {
    console.log('Cases database ready.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });
