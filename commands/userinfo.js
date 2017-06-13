const Discord = require('discord.js');
exports.run = (client, msg) => {

 let user3 = msg.author;
 const embed5 = new Discord.RichEmbed() 
     .setColor(0x8EE85F)
     .setTimestamp() 
     .setThumbnail(`${user3.displayAvatarURL}`) 
     .addField("User:", `${user3.tag}`)
     .addField("Status:", `${user3.presence.status}`)
     .addField("Join Date:", `${msg.guild.member(user3).joinedAt}`) 
     .addField("Account Created:", `${user3.createdAt}`) 
     .addField("Playing:", user3.presence.game ? user3.presence.game.name : 'Not playing a game.') 
     .setFooter(`${user3.id}`); 
     msg.channel.send( {embed: embed5} ).catch(console.error);
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
  name: "userinfo",
  description: "shows info about the user.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

