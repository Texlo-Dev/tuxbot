const Sequelize = require('sequelize')
const { levels } = require('../../settings/mysql-leveling')
const { levelBoard } = require('../../settings/levelBoard')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    let levels = await levelBoard.findAll({  
      attributes: ['level', 'userID', 'xp'], 
      where: {
      guildID: msg.guild.id,
      },
      order: [
        ['level', 'DESC'],
        ['xp', 'DESC']
      ]
    });
  
    var userString = levels.map(d => d.xp + ' ' + d.level + ' ' + d.userID).join(' ')
    var userArr = userString.split(' ')
    console.log(userString)
    console.log(userArr)
    console.log(levels)
    const embed = new Discord.RichEmbed()
     .setColor(0xFF4141)
     .setTimestamp()
    .addField('Experience Leaderboard', `Here are the top 10 members for ${msg.guild.name}:`)
    .addField(`#1 - Level ${userArr[1]} (${userArr[0]}XP) :crown:`, `${client.users.get(userArr[2])}`)
    .addField(`#2 - Level ${userArr[4]} (${userArr[3]}XP)`, `${client.users.get(userArr[5])}`)
    .addField(`#3 - Level ${userArr[7]} (${userArr[6]}XP)`, `${client.users.get(userArr[8])}`)
    .addField(`#4 - Level ${userArr[10]} (${userArr[9]}XP)`, `${client.users.get(userArr[11])}`) 
    .addField(`#5 - Level ${userArr[13]} (${userArr[12]}XP)`, `${client.users.get(userArr[14])}`)
    .addField(`#6 - Level ${userArr[16]} (${userArr[15]}XP)`, `${client.users.get(userArr[17])}`)
    .addField(`#7 - Level ${userArr[19]} (${userArr[18]}XP)`, `${client.users.get(userArr[20])}`)
    .addField(`#8 - Level ${userArr[22]} (${userArr[21]}XP)`, `${client.users.get(userArr[23])}`)
    .addField(`#9 - Level ${userArr[25]} (${userArr[24]}XP)`, `${client.users.get(userArr[26])}`)
    .addField(`#10 - Level ${userArr[28]} (${userArr[27]}XP)`, `${client.users.get(userArr[29])}`)
    .setFooter(`Requested by ${msg.author.tag}`)
    msg.channel.send({embed})
};



exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "xpboard",
  description: "Displays the top 10 members of the server.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
