  var download = require('download-file');
exports.run = (client, msg) => {
	const args = msg.content.split(' ').join();
	var url = "http://api.voicerss.org/?key=a796fa1425af4454a5b6103eda9c1703&hl=en-us&src=" + mesg; // Get your own key if you want :)
	var download = require('download-file');
	download(url, options, function(err){
    if (err) throw err;
    console.log("meow");
    if(message.member.voiceChannel) {
      message.member.voiceChannel.join().then(connection =>{
      const dispatcher = connection.playFile('./message.mp3');
      ///message.member.voiceChannel.leave();
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
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};