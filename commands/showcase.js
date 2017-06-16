exports.run = (client, msg) => {
 
 let showRole = msg.guild.roles.find('name', 'Showcase Contestant');
 msg.member.addRole(showRole);
 msg.reply('Congrats, you are now part of the showcase wars!');

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
  name: "showcase",
  description: "adds your role to the showcase wars.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
