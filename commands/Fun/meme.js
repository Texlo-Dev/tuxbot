const fs = require('fs')
exports.run = async (client, msg, [meme]) => {
    fs.readdir("./commands/Fun/memes/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
    let memeFile = fs.readFileSync(`./commands/Fun/memes/${file}`);
    let meme = file.split(".")[0];
   });
  });

    let memeDir = "./commands/Fun/memes";
    msg.channel.sendFile(`${memeDir}/${meme}.png`).catch(err => {
     return msg.reply("That meme doesn't exist.") 
    console.log(err);  
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
  name: "meme",
  description: "sends a meme to a channel.",
  usage: "<meme:string>",
  usageDelim: " ",
  extendedHelp: "",
};
