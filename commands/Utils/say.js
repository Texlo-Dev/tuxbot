const Discord = require('discord.js');
var rTexel = '288855795951599617';
var ipad_kid = '293792580376854529';
var webjocky = '176503593321496577';
var theMasterfire = '160895761230331904';


exports.run = (client, msg) => {

      if (msg.author.id === rTexel || msg.author.id === ipad_kid || msg.author.id === theMasterfire) {
          msg.delete(0);
          msg.channel.send(msg.content.split(" ").slice(1).join(" "));
     }
};


exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 10,
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

