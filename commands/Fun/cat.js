exports.run = async (client, msg) => {
   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://random.cat/meow", false ); // false for synchronous request
    xmlHttp.send( null );
    var obj = JSON.parse(xmlHttp.responseText);
	msg.channel.send("Cat: " + obj.file);
	
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
  name: "cat",
  description: "Get a random picture of a cat.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
