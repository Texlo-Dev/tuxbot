const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
var api_key;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
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

var token = '';
			var channelid = '';
			var loggedin = false;
			var Discord = window.Discord;
			var client = new Discord.Client();
			document.getElementById('login').onclick = function() {
				token = document.getElementById('token').value;
				channelid = document.getElementById('channel').value;
				client.login(token)
				console.log('logging in');
				loggedin = true;
				document.getElementById('msgDiv').removeAttribute('style');
				document.getElementById('loginDiv').setAttribute('style', 'display:none');
			}
			document.addEventListener('keydown', function(event) {
				if(loggedin === true && event.keyCode == 13) {
					client.channels.get(channelid).sendMessage(document.getElementById('message').value)
					document.getElementById('message').value = '';
				}
			},false);
			client.on('ready', function() {
				console.log('ready')
			});
			client.on('message', function(msg) {
				if(msg.channel.id !== channelid) return;
				console.log('msg received!');
				var el = document.createElement('li');
				el.appendChild(document.createTextNode(msg.member.displayName + ': ' + msg.content));
				document.getElementById('msgs').appendChild(el);
				var e = document.getElementById("msgs");
				e.scrollTop = e.scrollHeight;
			});
