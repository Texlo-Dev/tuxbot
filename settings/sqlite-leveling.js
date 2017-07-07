const Sequelize = require('sequelize')
module.exports = {
    levels:  new Sequelize({
    dialect: 'sqlite',
 
     storage: './sqlite/leveling.sqlite',

    logging: false
 })
};

