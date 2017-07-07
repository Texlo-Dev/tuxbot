const Sequelize = require('sequelize')
const config = require('../config.json')
module.exports = {
    Sequelize: require('sequelize'),
    tags: new Sequelize('tuxbot', 'tux', config.sqlPass, {
       dialect: 'mysql',
 
       host: 'localhost',

       logging: false
     })
  };
   module.exports.tags.authenticate()
  .then(() => {
    console.log('Tag database ready.');
  })
  .catch(err => {
    console.error('Unable to connect to MySQL:', err);
  });
