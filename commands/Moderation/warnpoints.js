const Discord = require('discord.js');
const config = require('../../config.json');
const Sequelize = require('sequelize');
const { warnpoints } = require('../../settings/mysql-wp') 
const { warnList } = require('../../settings/warnList.js') 

exports.run = async (client, msg, [mention]) => {
let member = msg.mentions.users.first();
    let author = msg.author; 
    if(member && msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) {
         warnUser = member;
    } else {
         warnUser = author;
    }

    const userSnowflake = warnUser.id
    warnList.find({where:{userID: msg.author.id || member.id, guildID: msg.guild.id}}).then((res) => {
        if (res === null) { 
            msg.delete(0);
            msg.reply('You have **0** warning points.');
        } 
        else { 
          if (res.warnpoints) {
             msg.delete(0);  
             msg.reply(`You have **${res.warnpoints}** warning points.`).catch(console.error);
        } 
        if (res === null && member) {
           msg.delete()
           msg.reply(`${member.user.username} has **0** warning points.`)
        } else {
         if (res.warnpoints && member) {
          msg.delete()
          msg.reply(`${member.user.username} has ${res.warnpoints} warning points.`)
       }
      }
     }});
 
  

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
  name: "warnpoints",
  description: "checks your wanrpoints.",
  usage: "[mention:user]",
  usageDelim: "",
  extendedHelp: "",
}; 
