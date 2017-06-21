exports.run = async (client, msg) => {

  msg.reply(msg.author.avatarURL('png')).catch(console.error);
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
  name: "fetchavatar",
  description: "Fetches the user's avatar.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

