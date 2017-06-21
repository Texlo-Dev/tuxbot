exports.run = async (client, msg) => {
msg.channel.send('Add me to your server!: https://discordapp.com/oauth2/authorize?client_id=304629953054507018&scope=bot&permissions=8')
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
  name: "invite",
  description: "invite Tux to your server.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

