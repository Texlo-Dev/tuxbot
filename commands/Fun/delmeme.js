const fse = require('fs-extra')
const fs = require('fs')
exports.run = async (client, msg, [meme]) => {
    fs.readdir("./commands/Fun/memes/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
    let memeFile = fs.readFileSync(`./commands/Fun/memes/${file}`);
    let memeName = file.split(".")[0];

    let memeDir = "./commands/Fun/memes";
    if (meme === memeName) {
      fse.remove(`${memeDir}/${file}`, err => {
      if (err) return msg.reply("That meme doesn't exist, silly")
        msg.reply(`Successfully deleted the meme "${meme}".`)
        console.log('success!')
     });
    }
  });
 });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "delmeme",
  description: "deletes a meme from the collection.",
  usage: "<meme:str>",
  usageDelim: "",
  extendedHelp: "",
};
