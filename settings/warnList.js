const { Sequelize, warnpoints } = require('./mysql_wp-db.js')
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
    	    type: Sequelize.INTEGER
  	 }
      })
};

module.exports.warnList.sync();
