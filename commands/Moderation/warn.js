const Discord = require('discord.js');
const dir = '/home/richrancy/tuxbot'
const Sequelize = require('sequelize');
const config = require(`${dir}/config.json`)
const { cases } = require('../../settings/mysql_case-db.js')
const { caseList } = require('../../settings/caseList.js')
const { warnpoints } = require('../../settings/mysql_wp-db.js') 
const { warnList } = require('../../settings/warnList.js')

exports.run = async (client, msg, [warnUser, points, ...reason]) => {

  const modlog = msg.guild.channels.find('name', 'mod-logs');
  if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply("You don't have perms to warn people.").catch(console.error);
  if (!modlog) return msg.reply('I cannot find a mod-log channel.').catch(console.error);
  msg.delete(0);
  
  let dbEntry = await warnList.find({where:{userID:warnUser.id, guildID:msg.guild.id}});
  if(!dbEntry) {
    dbEntry = await warnList.create({guildID:msg.guild.id, userID:warnUser.id, warnpoints: points});
  } else {
  let totalPoints = dbEntry.warnpoints + points;
   userSnowflake = dbEntry.userID
    warnList.find({where:{guildID: msg.guild.id}}).then((res) => {
      if (res === null) {
        warnList.create({guildID:msg.guild.id, userID:warnUser.id, warnpoints: points})
      } else {
        warnList.update({warnpoints:totalPoints}, {where: {userID: warnUser.id, guildID: msg.guild.id}}).catch(console.error)
      }});
   }
  
  reasonStr = reason.slice(',').join(' ')
  warnUser.send(`You have been issued **${points}** warning points by **${msg.author.username}** for the following reason: ${reasonStr}`)
 console.log(require('util').inspect({userID: warnUser.id, action:`${points} warning points`, modID: msg.author.id, reasonFor: reason, createdAt: msg.createdAt})) 
 caseList.create({userID: warnUser.id, action:`${points} warning points`, modID: msg.author.id, reasonFor: reason.join(' '), createdAt: msg.createdAt}).then((res) => {
   var reasonString = reason.join(' ')
   const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setThumbnail(warnUser.displayAvatarURL({}))
    .addField('User Warned', `${warnUser.tag}`)
    .addField('Points:', points)
    .addField('Reason:', reasonString)
    .addField('Moderator:', `${msg.author.tag}`)
    .setFooter(`Case#${res.caseNum}`)
     modlog.send({embed}).catch(console.error)
   });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "warn",
  description: "warns a user.",
  usage: "<warnMember:user> <points:int> <reason:string> [...]",
  usageDelim: " ",
  extendedHelp: "",
};
