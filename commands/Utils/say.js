const Discord = require('discord.js');
var rTexel = '288855795951599617';
var ipad_kid = '293792580376854529';
var webjocky = '176503593321496577';
var theMasterfire = '160895761230331904';


exports.run = async (client, msg) => {
     msg.delete(0);
     msg.channel.send(msg.content.split(" ").slice(1).join(" "));
};


exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "say",
  description: "top secret",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

