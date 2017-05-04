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
      case msg.content.includes(prefix + 'fetchavatar'):
        msg.reply(msg.author.avatarURL);
        break;

      // Show help text for /fetchavatar
      case msg.content.includes(prefix + 'fetchavatar --help'):
        msg.reply('```Bash\nusage: /fetchavatar \nReturns the URL to your Discord-hosted avatar```');
        break;

      // Nickname update handler
      case msg.content.includes(prefix + 'distro'):
        var nickname = msg.content.replace(prefix + 'distro', '').trim();
        newNick = msg.author.username + ' ['+nickname+']';

        // Remove distro
        if(!nickname){
          msg.member.setNickname(msg.author.username);
          msg.reply('Distro removed');
          break;
        }
        // Check for length limit
        else if(newNick.length > 32) {
          msg.reply('Distro too long');
          break;
        }
        // Set distro
        else {
          msg.member.setNickname(newNick);
          msg.reply('Distro Set');
          break;
        }

      // Show help text for /distro
      case msg.content.includes(prefix + 'distro --help'):
        msg.reply('```Bash\nusage: /distro <distroname>\nProviding no argument will remove the distro```');
        break;

      //==== EVAL - Be careful modifying this! ====//
      case msg.content.includes(prefix + 'eval'):
        if(msg.author.id === '288855795951599617'){
          msg.reply(eval(msg.content.replace(prefix + 'eval', '').trim()));
          break;
        }else{
          break;
        }
      //==== END EVAL =============================//
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