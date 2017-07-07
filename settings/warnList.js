const { Sequelize, warnpoints } = require('./mysql-wp')
module.exports = { 
        warnList: warnpoints.define('warnList', {
  	    id: {
            type: Sequelize.INTEGER,
    	    autoIncrement: true,
    	    primaryKey: true
  	    },
  	    guildID: {
    	    type: Sequelize.STRING
   	    },
  	    userID: {
    	    type: Sequelize.STRING
  	    },
  	    warnpoints: {
    	    type: Sequelize.INTEGER,
            defaultValue: 0
  	 }
      })
};

module.exports.warnList.sync();
