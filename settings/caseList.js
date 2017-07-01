const { Sequelize, cases } = require('./mysql_case-db.js')
module.exports =  {
 	caseList: cases.define('caseList', {
  	  guildID: {
                 type: Sequelize.STRING
          },
          caseNum: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
          },
          userID: {
    		type: Sequelize.STRING
  	  },
  	  action: {
    		type: Sequelize.STRING
  	  },
  	  modID: {
    		type: Sequelize.STRING
  	  },
  	  reasonFor: {
    		type: Sequelize.STRING
  	  }
     })

};

module.exports.caseList.sync()
