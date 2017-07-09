const Sequelize = require('sequelize')
const { levels } = require('../../settings/mysql-leveling')
const { levelBoard } = require('../../settings/levelBoard')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
  var user;
   let member = msg.mentions.users.first();
   let author = msg.author
   if (member) {
     user = member
    } else {
     user = author
   }
   
      const levels = await levelBoard.findAll({  
      attributes: ['level', 'userID', 'xp'], 
      where: {
      guildID: msg.guild.id,
      },
      order: [
        ['level', 'DESC'],
        ['xp', 'DESC']
      ]
    });
  

    levelBoard.find({where: {userID: user.id, guildID: msg.guild.id}}).then((res) => {
      if (res === null) {
        return msg.reply('New member detected, creating new entry....')
          .then(m => m.delete(5000))
      }

    var userString = levels.map(d => d.xp + ' ' + d.level + ' ' + d.userID).join(' ')
    var userArr = userString.split(' ')
    var userplace = userArr.indexOf(res.userID)
   // console.log(userArr)

     var rankArr = ['0']
     for (var i = 2; i < userArr.length; i += 3) {
        rankArr.push(userArr[i])
     }
     //console.log(rankArr)

        const embed = new Discord.RichEmbed()
        .setColor(3534687)
        .setTimestamp()
        .setAuthor(`${client.users.get(res.userID).tag}`, `${client.users.get(res.userID).displayAvatarURL({})}`)
        .addField('Leveling Stats:', `Currently level ${res.level}`, true)
        .addField('Experience Points:', `${res.xp}/${res.toNextLevel}`, true)
        .addField('Rank:', `${rankArr.indexOf(user.id)}/${msg.guild.memberCount}`)
        .setFooter(`Requested by ${msg.author.tag}`);
        msg.delete(0)
        msg.channel.send({embed})
       // console.log(embed)
    })
}

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
  name: "xplevel",
  description: "Gets your current xp status.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
