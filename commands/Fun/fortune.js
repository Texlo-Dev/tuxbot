const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.run = async (client, msg) => {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://fortunecookieapi.herokuapp.com/v1/cookie", false ); // false for synchronous request
    xmlHttp.send( null );
    var obj = JSON.parse(xmlHttp.responseText);
    msg.channel.send("🔮: " + obj[0].fortune.message);

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
  name: "fortune",
  description: "gives you a fortune.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
