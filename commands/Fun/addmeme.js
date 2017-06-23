const snekfetch = require('snekfetch')
const fs = require('fs')
exports.run = async (client, msg) => {
const args = msg.content.split(' ')
   args[1] = args.slice(2)
   args[2] = args.slice(3)
   let memeName = args[1]
   let link = args[2]
   let extension = link.split('.')[1]  
   if (!memeName) return msg.reply('Please specify a meme name.')
   if (!link) return msg.reply('Please provide a valid meme link.')

  await snekfetch.get(`${link}`)
  .pipe(fs.createWriteStream(`${memeName}.${extension}`)) 
  msg.reply('Meme successfully added.');
};

exports.conf = {
  enabled: false,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "addmeme",
  description: "adds a meme to the collection.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};
