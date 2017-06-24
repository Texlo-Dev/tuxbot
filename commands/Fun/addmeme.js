const snekfetch = require('snekfetch')
const fs = require('fs')
exports.run = async (client, msg, [memeName, linkURL]) => {
 const extension = linkURL.split('.')[3]
  snekfetch.get(`${linkURL}`)
  .then(r => fs.writeFile(`./commands/Fun/memes/${memeName}.${extension}`, r.body)) 
  msg.reply(`Meme "${memeName}" successfully added.`).catch(console.error);
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
  name: "addmeme",
  description: "adds a meme to the collection.",
  usage: "<memeName:str> <linkURL:str>",
  usageDelim: " ",
  extendedHelp: "",
};
