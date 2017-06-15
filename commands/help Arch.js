const Discord = require('discord.js');
exports.run = (client, msg) => {

   msg.channel.send("Official Arch install guide: https://wiki.archlinux.org/index.php/Installation_guide");
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
  name: "help-arch",
  description: "Shows the Arch installation guide.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

