const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var prefix = '/';
var token;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('with a Terminal');
});

// Message Listener & Logic
client.on('message', msg => {

  // Check if conversational
  switch(msg.content){
    // ping -> Pong!
    case 'ping':
      msg.reply('Pong!');
      break;

    // Tux mentioned
    case 'Tux':
      msg.reply('Did someone mention me?');
      break;
  }

  // Check if the message is a command
  if(msg.content.startsWith(prefix)){

    // Check which command
    switch(msg.content){


      // Get requestor's avatar URL
      case prefix + 'fetchavatar':
        msg.reply(msg.author.avatarURL);
        break;

      // Tell user what fetchavatar does
      case prefix + 'fetchavatar --help':
        msg.reply('```Bash\nusage: /fetchavatar \nReturns the URL to your Discord-hosted avatar```');
        break;

      // Nickname update handler
      case prefix + 'distro':
        var nickname = msg.content.replace(prefix + 'distro', '').trim()
        newNick = msg.author.username + ' ['+nickname+']';
        if(nickname.length == 0){
          msg.member.setNickname(msg.author.username);
          msg.reply('Distro removed');
          break;
        }
        else if(newNick.length > 32) {
          msg.reply('Distro too long');
          break;
        }
        else {
          msg.member.setNickname(newNick);
          msg.reply('Distro Set');
          break;
        }
        break;

      case prefix + 'distro --help':
        msg.reply('```Bash\nusage: /distro [<distroname>]\nProviding no argument will remove the distro```');
        break;

      // EVAL - Be careful modifying this!
      case prefix + 'eval':
        if(msg.author.id === '288855795951599617'){
          msg.reply(eval(msg.content.replace(prefix + 'eval', '').trim()));
          break;
        }else{
          break;
        }
    }
  }
});

// Read Discord token from file
fs.readFile('./discord_key.txt', 'utf8', function (err,data) {
  var response = '';
  if (err) {
    return console.log(err);
  }
  token = data;
  if (token) {
          client.login(token).catch(console.error);
          response = 'Token Found';
    } else {
        response = 'No Token found';
    }
  console.log(response);
});