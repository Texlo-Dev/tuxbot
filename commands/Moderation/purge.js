exports.run = async (client, msg, [user, amount]) => {
   msg.channel.fetchMessages({
   limit: amount,
  }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
  });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "purge",
  description: "purges messages sent by a user/users.",
  usage: "[user:mention] <amount:int>",
  usageDelim: "",
  extendedHelp: "",
};
