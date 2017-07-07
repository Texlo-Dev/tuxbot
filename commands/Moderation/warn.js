const Discord = require('discord.js');
const Sequelize = require('sequelize');
const config = require('../../config.json')
const { cases } = require('../../settings/mysql-case')
const { caseList } = require('../../settings/caseList.js')
const { warnpoints } = require('../../settings/mysql-wp') 
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
  
  let caseEntry = await caseList.count({where:{guildID:msg.guild.id}})
  const caseInt = caseEntry + 1
 
  reasonStr = reason.slice(',').join(' ')
  warnUser.send(`You have been issued **${points}** warning points by **${msg.author.username}** for the following reason: ${reasonStr}`)
 console.log(require('util').inspect({userID: warnUser.id, action:`${points} warning points`, modID: msg.author.id, reasonFor: reason, createdAt: msg.createdAt})) 
 caseList.create({guildID: msg.guild.id, caseNum: caseInt, userID: warnUser.id, action:`${points} warning points`, modID: msg.author.id, reasonFor: reason.join(' '), createdAt: msg.createdAt}).then((res) => {
   var reasonString = reason.join(' ')
   const embed = new Discord.RichEmbed()
     .setColor(0xFF0000)
     .setTimestamp()
     .setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({}))
     .setThumbnail(warnUser.displayAvatarURL({}))
     .setDescription(`\n**Warn**\n\n**Member:** ${warnUser.tag}\n\n**ID:** ${warnUser.id}\n\n**Warning points:** ${points}\n\n**Reason:** ${reasonStr}`)  
     .setFooter(`Case#${res.caseNum}`)
     modlog.send({embed}).catch(console.error)
   });

  var kickNum = 500;
  var banNum = 800;
  var total = dbEntry.warnpoints + points;
  if (dbEntry.warnpoints === points) total = points;
  console.log(`DB entry is ${dbEntry.warnpoints}`)
  console.log(`Points are ${points}`)
  console.log(`Total points are ${total}`)
  if (total >= banNum) {
    warnUser.send(`You have exceeded the hard limit for warning points here, and have been banned from the server. All appeals should go to **${msg.author.tag}**.`).then(() => {
     msg.guild.ban(warnUser, {days: 3})
   });
  } else if (dbEntry.warnpoints < kickNum && total >= kickNum) {
     warnUser.send(`You have exceeded the soft limit for warning points here, and have been kicked from the server. You are welcome to join again, but know that the next action is a ban.`).then(() => {
     msg.guild.member(warnUser).kick()
  });
 }
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
