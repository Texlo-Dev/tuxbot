const { Sequelize, levels } = require('./mysql-leveling')
module.exports = {
    levelBoard: levels.define('levelBoard', {
	  guildID: Sequelize.STRING,
  	  userID: Sequelize.STRING,
	  level: {
		  type: Sequelize.INTEGER,
		  defaultValue: 1,
		  allowNull: false
	  },
      xp: {
          type: Sequelize.INTEGER,
          defaultValue: 10,
          allowNull: false
      },
      toNextLevel: {
          type: Sequelize.INTEGER,
          defaultValue: 100,
          allowNull: false
      }
  })

};

module.exports.levelBoard.sync()
