const Discord = require('discord.js');
const dir = '/home/richrancy/tuxbot'
const config = require(`${dir}/config.json`);
const Sequelize = require('sequelize');
const { warnpoints } = require('../../settings/mysql_wp-db.js') 
const { warnList } = require('../../settings/warnList.js') 

exports.run = async (client, msg) => {
let member = msg.mentions.users.first();
    let author = msg.author; 
    if(member && msg.member.hasPermission('BAN_MEMBERS')) {
         warnUser = member;
    } else {
         warnUser = author;
    }

    const userSnowflake = warnUser.id
    warnList.find({where:{guildID: msg.guild.id}}).then((res) => {
        if (res === null) { 
            msg.delete(0);
            msg.reply('You have **0** warning points.');
        } 
        else if (res.guildID !== msg.guild.id) {
             msg.delete(0);
             msg.reply('You have **0** warning points.');
       } else { 
          if (res.warnpoints) {
             msg.delete(0);  
             msg.reply(`You have **${res.warnpoints}** warning points.`).catch(console.error);
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
  usage: "",
  usageDelim: "",
  extendedHelp: "",
}; 
