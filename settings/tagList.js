const { Sequelize, tags } = require('./mysql-tags.js')
module.exports = {
    tagList: tags.define('tagList', {
	  guildID: Sequelize.STRING,
  	  tagName: Sequelize.STRING,
  	  tagContent: Sequelize.STRING,
  	  tagAuthor: Sequelize.STRING,
	  usage_count: {
		  type: Sequelize.INTEGER,
		  defaultValue: 0,
		  allowNull: false
	  }
  })

};

module.exports.tagList.sync()
