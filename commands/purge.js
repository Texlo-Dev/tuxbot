exports.run = (client, msg) => {
const user = msg.mentions.users.first();
const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[2]) : parseInt(msg.content.split(' ')[1])
if (!amount) return msg.reply('Must specify an amount to delete!');
if (!amount && !user) return msg.reply('Must specify a user and amount, or just an amount, of messages to purge!');
msg.channel.fetchMessages({
  limit: amount,
}).then((messages) => {
  if (user) {
    const filterBy = user ? user.id : Client.user.id;
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
  description: "Command Description",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};    
