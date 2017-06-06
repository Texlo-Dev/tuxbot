const Discord = require('discord.js');
<<<<<<< HEAD
=======
const sequelize = new Sequelize({
  dialect: 'sqlite',

  storage: './database.sqlite'
});
const Sequelize = require('sequelize');
>>>>>>> c20091dfbff32a6b4ef9d6b1f4ac113e8344e6d9
const client = new Discord.Client();
const config = require('./config.json');
var prefix = '/';
var token;
var rTexel = '288855795951599617';
var ipad_kid = '293792580376854529';
var webjocky = '176503593321496577';
const responses = [
   'yes.', 'no.', 'maybe.', 'okay.', 'Ask me later.', 'Naw.', 'Most Likely.', 'Sure.', 'Definitely.', 'It is likely.', 'Certainly.', 
];



client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame('with a Terminal').catch(console.error);
});

// Message Listener & Logic
client.on('message', msg => {
  // Check if conversational
  switch (msg.content) {
    // ping -> Pong!
    case 'ping':
        msg.reply('Pong!').catch(console.error);
        break;

        // Tux mentioned
    case 'Tux':
        msg.reply('Did someone mention me?').catch(console.error);
        break;
  }

  //==========BEGIN Command Block
  // Check if the message is a command
  if (msg.content.startsWith(prefix)) {

    // Check which command
    switch (msg.content) {

      // Get requestor's avatar URL
      case prefix + 'fetchavatar':
          msg.reply(msg.author.avatarURL).catch(console.error);
          break;
        
      // Alert
      case prefix + 'alert':
            if (!msg.member.hasPermission('BAN_MEMBERS')) {
                return;
            }
            msg.delete(0);
            msg.channel.send('**BEEP BOOP :rotating_light: YOU ARE SURROUNDED :rotating_light: PUT YOUR HANDS UP :rotating_light: ON THE GROUND :rotating_light:**');
            break;

      case prefix + '8ball':
      case (msg.content.match(/\/8ball[a-zA-Z0-9 ]*/) || {}).input:
          msg.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
          break;
   
   // Show help text for /fetchavatar
      case prefix + 'fetchavatar --help':
          msg.reply('```Bash\nusage: /fetchavatar \nReturns the URL to your Discord-hosted avatar```').catch(console.error);
          break;

      // Show help text for /distro
      case prefix + 'distro --help':
          msg.reply('```Bash\nusage: /distro <distroname>\nProviding no argument will remove the distro```').catch(console.error);
          break;
                
     

 
      // Nickname update handler
      case prefix + 'distro':
      case (msg.content.match(/\/distro[a-zA-Z0-9 ]*/) || {}).input:
          var nickname = msg.content.replace(prefix + 'distro', '').trim();
          newNick = msg.author.username + ' [' + nickname + ']';

          // Remove distro
          if (nickname.length === 0) {
              msg.member.setNickname(msg.author.username).catch(console.error);
              msg.reply('Distro removed').catch(console.error);
              break;
          }
          // Check for length limit
          else if (newNick.length > 32) {
              msg.reply('Distro too long').catch(console.error);
              break;
          }
          // Set distro
          else {
              msg.member.setNickname(newNick).catch(console.error);
              msg.reply('Distro Set').catch(console.error);
              break;
          }
        break;

      //Eval command: extra caution
      case prefix + 'eval':
      case (msg.content.match(/\/eval[a-zA-Z0-9 ]*/) || {}).input:
          if (msg.author.id == rTexel || msg.author.id === ipad_kid) {
              var evaled = eval(msg.content.replace(prefix + 'eval', '').trim());
              if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
	        msg.channel.send(evaled).catch(console.error);
                break;
              }
              break;
          } else {
            msg.reply("sorry I can't do that for you.");
            break;
          }
        break;

      // Say command
      case prefix + 'say':
      case (msg.content.match(/\/say[a-zA-Z0-9 ]*/) || {}).input:
        if (msg.author.id === rTexel || msg.author.id === ipad_kid) {
          msg.delete(0);
          msg.channel.send(msg.content.split(" ").slice(1).join(" "));
          break;
        }
        break;

     

     // Ban command
     case prefix + 'ban':
     case (msg.content.match(/\/ban[a-zA-Z0-9 ]*/) || {}).input:
     const args = msg.content.split(' ');
     const user = msg.mentions.users.first();
     const reason = args.slice(2).join(' ');
     const modlog = client.channels.find('name', 'mod-logs');
     if (!msg.member.hasPermission('BAN_MEMBERS')) {
          return msg.reply("You don't have the permissions (BAN_MEMBERS) to do this.").catch(console.error);
      }
      if (!modlog) return msg.reply('I cannot find a mod-log channel.');
      if (reason.length < 1) return msg.reply('No reason? Cmon now, give a reason.');
      if (msg.mentions.users.size < 1) return msg.reply('Please mention a user to ban.').catch(console.error);

      if (!msg.guild.member(user).bannable) return msg.reply('I cannot ban that member.');
      msg.delete(0);
      msg.guild.ban(user, 2);

      const embed2 = new Discord.RichEmbed()
	.setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(user.avatarURL)
	.addField('User Banned', `${user.username}#${user.discriminator}`)  
        .addField('Reason for Ban:', reason)
	.addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`);
      return client.channels.get(modlog.id).send({ embed: embed2 });
      break;

   //Kick Command
   case prefix + 'kick':
   case (msg.content.match(/\/kick[a-zA-Z0-9 ]*/) || {}).input:
      const args2 = msg.content.split(' ');
      const modlog2 = client.channels.find('name', 'mod-logs');
      let user2 = msg.mentions.users.first();
      const reason2 = args2.slice(2).join(' ');
      if (!msg.member.hasPermission('KICK_MEMBERS')) {
          return msg.reply("You don't have the permissions (KICK_MEMBERS) to do this.").catch(console.error);
      }
      if (!modlog2) return msg.reply('I cannot find a mod-log channel.');
      if (reason2.length < 1) return msg.reply('No reason? Cmon now, give a reason.');
      if (msg.mentions.users.size < 1) return msg.reply('Please mention a user to kick.').catch(console.error);

      if (!msg.guild.member(user2).kickable) return msg.reply('I cannot kick that member.');
      msg.guild.member(user2).kick();

      const embed = new Discord.RichEmbed()
	.setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(user2.avatarURL)
	.addField('User Kicked', `${user2.username}#${user2.discriminator}`)  
        .addField('Reason for Kick:', reason2)
	.addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`);
      return client.channels.get(modlog2.id).send({embed});
  }}});
 

// Read Discord token from file
client.login(config.token);
client.on('debug', console.log);
