const Discord = require('discord.js');
exports.run = (client, msg) => {

     if (!msg.member.hasPermission('BAN_MEMBERS')) {
         return;
     }
      msg.delete(0);
      msg.channel.send('**BEEP BOOP :rotating_light: YOU ARE SURROUNDED :rotating_light: PUT YOUR HANDS UP :rotating_light: ON THE GROUND :rotating_light:**');
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
  name: "alert",
  description: "Command Description",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

