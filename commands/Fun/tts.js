const snekfetch = require('snekfetch');
const fs = require('fs')
const Discord = require('discord.js')
exports.run = async (client, msg, [message]) => {
     await snekfetch.get("http://api.voicerss.org/?key=f793a701dcb1450aabf2cffce0ca00a5&hl=en-us&src=" + message)
    .then(r => fs.writeFile('message.mp3', r.body)); 
    msg.delete()
    msg.member.voiceChannel.join().then(connection =>{
      const dispatcher = connection.playFile('message.mp3')
	dispatcher.on("end",function () {
          msg.member.voiceChannel.leave();
        });
    });
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
  name: "tts",
  description: "Play a text to speech message on a voice channel.",
  usage: "<message:string>",
  usageDelim: "  ",
  extendedHelp: "",
};

