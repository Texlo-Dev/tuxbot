const Discord = require('discord.js');
exports.run = async (client, msg) => {
  const embed = new Discord.RichEmbed()
  .setColor(0x8EE85F)
  .setAuthor('Invite Tux & more', 'https://cdn.discordapp.com/avatars/304629953054507018/9e32915c30c3b681d972232c259bc0f2.png?size=2048')
  .addField('If you want Tux to be part of your server,',  '[Click here!](https://discordapp.com/oauth2/authorize?client_id=304629953054507018&scope=bot&permissions=8)')
  .addField('If you would like to join the Linux Discord server, where it all started:', '[Linux Discord Server](http://discord.gg/Xcn9yVK)')
  .addField('Share our website:', '[Tuxbot by rTexel](http://rtk99.github.io/tuxbot/)')
  msg.channel.send({embed});
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

