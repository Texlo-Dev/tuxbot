const { levels } = require('../settings/mysql-leveling')
const { levelBoard } = require('../settings/levelBoard')

exports.run = async (client, msg) => {
  if (msg.guild && msg.guild.me.hasPermission('BAN_MEMBERS')) {
      if (msg.author.bot) return;
    let entry = await levelBoard.find({where: {guildID: msg.guild.id, userID: msg.author.id} })
    if (!entry) {
        entry = await levelBoard.create({guildID: msg.guild.id, userID: msg.author.id })
    } else {
       let gained = entry.xp + Math.floor(Math.random() * 5)
       levelBoard.update({xp: gained}, {where: {guildID: msg.guild.id, userID: msg.author.id }})
    }  
    if (entry.xp >= entry.toNextLevel) {
        var newGoal = Math.round(entry.toNextLevel * 2.23)
        var newLevel = entry.level + 1
        var newXP = 0
        levelBoard.update({level: newLevel, toNextLevel: newGoal, xp: newXP}, {where: {guildID: msg.guild.id, userID: msg.author.id}})
    }
  }
 }

