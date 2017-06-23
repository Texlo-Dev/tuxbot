const fs = require('fs')
exports.run = async (client, msg, [meme]) => {
    fs.readdir("./commands/Fun/memes/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
    let memeFile = fs.readFileSync(`./commands/Fun/memes/${file}`);
    let memeName = file.split(".")[0];

    let memeDir = "./commands/Fun/memes";
    if (meme === memeName) {
    msg.delete(5)
    msg.channel.sendFile(`${memeDir}/${file}`).catch(err => msg.reply("That meme doesn't exist."));
   }});
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
