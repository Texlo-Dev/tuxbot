const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
var prefix = "/"
var api_key;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('with a Terminal');
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on("message", msg=> {
  if (msg.content.startsWith("Tux")) {
    msg.channel.sendMessage("Did someone mention me?");
  }
});

client.on("message", msg=> {
   if (msg.content === '/fetchavatar') {
     msg.reply(msg.author.avatarURL);
 }
});

client.on("message", msg=> {
  if (msg.content.startsWith(prefix + 'adddistro')) {
    var nickname = msg.content.replace(prefix + "adddistro", "")
    msg.member.setNickname(msg.author.username + "[" + nickname + "]");
    msg.reply("Nickname Set.");
 }
});

fs.readFile('./discord_key.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  api_key = data;
  if (api_key) {
          client.login(api_key);
    } else {
          console.log("No API Key found");
    }
  console.log(data);
});
