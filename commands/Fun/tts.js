const Discord = require('discord.js')
var download = require('download-file');
var options = {
    directory: "./",
    filename: "message.mp3"
}
exports.run = async (client, msg, [message]) => {
    var url = "http://api.voicerss.org/?key=a796fa1425af4454a5b6103eda9c1703&hl=en-us&src=" + message; // Get your own key if you want :)
    download(url, options, function(err){
    if (err) {
    console.log(err)
    }
    msg.delete();
    if(msg.member.voiceChannel) {
     // msg.member.voiceChannel.join()
      msg.member.voiceChannel.join().then(connection =>{
      const dispatcher = connection.playFile('./message.mp3');
	dispatcher.on("end",function () {
           msg.member.voiceChannel.leave();
        });
    });

  }
});
}
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
