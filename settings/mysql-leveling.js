const Sequelize = require('sequelize')
const config = require('../config.json')
module.exports = {
    Sequelize: require('sequelize'),
    levels: new Sequelize('tuxbot', 'tux', config.sqlPass, {
       dialect: 'mysql',
 
       host: 'localhost',

       logging: false
     })
  };
   module.exports.levels.authenticate()
  .then(() => {
    console.log('Leveling database ready.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });
