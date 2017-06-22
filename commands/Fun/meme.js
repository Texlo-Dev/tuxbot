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
    msg.delete(5000)
    msg.channel.sendFile(`${memeDir}/${meme}.png`).catch(error => {
     return msg.reply("That meme doesn't exist.") 
    console.log(error);  
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
  description: "Sends a meme to your current channel.",
  usage: "<meme:string>",
  usageDelim: " ",
  extendedHelp: "Available memes: archinstallwoes, banned, dell, gnulinux, googleit, noo, pleb",
};
