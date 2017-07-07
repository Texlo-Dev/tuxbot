exports.run = async (client, msg) => {
    msg.author.fetchProfile().then(premium => {
        if (!premium) msg.reply(`You don't have nitro, welp.`)
        else {
        msg.reply('You have nitro, cool!')
    }
 })
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
  name: "nitroguess",
  description: "Can Tux guess your nitro status? Let's find out!",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
