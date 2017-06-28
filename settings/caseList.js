const { Sequelize, cases } = require('./mysql_case-db.js')
module.exports =  {
 	caseList: cases.define('caseList', {
  	   caseNum: {
        	type: Sequelize.INTEGER,
    		autoIncrement: true,
    		primaryKey: true
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
