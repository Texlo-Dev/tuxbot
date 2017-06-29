const snekfetch = require('snekfetch')
const fs = require('fs')
exports.run = async (client, msg, [memeName, linkURL]) => {
 const urlarray = linkURL.split('.');
 const ext = urlarray[urlarray.length - 1];
  snekfetch.get(`${linkURL}`)
  .then(r => fs.writeFile(`./commands/Fun/memes/${memeName}.${ext}`, r.body)) 
  msg.reply(`:inbox_tray: Meme "${memeName}" successfully added.`).catch(console.error);
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
