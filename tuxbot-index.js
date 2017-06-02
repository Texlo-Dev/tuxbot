const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const admins = config.admins;
const host = config.host;
const user = config.user;
const pass = config.pass;
const db = config.database;
const mysql = require('mysql');
var connection = mysql.createConnection({
  host : host,
  user : user,
  password : pass,
  database : db
});

var prefix = '/';
var token;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame('with a Terminal').catch(console.error);
});

// Message Listener & Logic
client.on('message', async(msg) => {
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

      // Show help text for /fetchavatar
      case prefix + 'fetchavatar --help':
          msg.reply('```Bash\nusage: /fetchavatar \nReturns the URL to your Discord-hosted avatar```').catch(console.error);
          break;

      // Show help text for /distro
      case prefix + 'distro --help':
          msg.reply('```Bash\nusage: /distro <distroname>\nProviding no argument will remove the distro```').catch(console.error);
          break;

      /*// Nickname update handler
      case prefix + 'distro':
      case (msg.content.match(/\/distro[a-zA-Z0-9 ]) || {}).input:
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
          }*/

      //Eval command: extra caution
      case prefix + 'eval':
      case (msg.content.match(/\/eval[a-zA-Z0-9 ]*/) || {}).input:
          if (isAdmin(msg.author.id)) {
              msg.delete(0);
              var evaled = eval(msg.content.replace(prefix + 'eval', '').trim());
              if (typeof evaled !== "string"){
                evaled = require("util").inspect(evaled);
                msg.reply(evaled).catch(console.error);
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
        if (isAdmin(msg.author.id)) {
          msg.delete(0);
          msg.channel.send(msg.content.split(" ").slice(1).join(" "));
          break;
        }
        break;

      // Ban command
      case prefix + 'ban':
      case (msg.content.match(/\/ban[a-zA-Z0-9 ]*/) || {}).input:
        // Check for users to ban
        if (msg.mentions.users.size === 0) {
          return msg.reply('Please mention a user to ban').catch(console.error);
        }
        let banMember = msg.guild.member(msg.mentions.members.first());
        if (!banMember) {
          return msg.reply('That user does not seem valid');
        }
        // Check for permissions
        if (!msg.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
          return msg.reply("You don't have the permissions (BAN_MEMBERS) to do this.").catch(console.error);
        }
        banMember.ban().then(member => {
          msg.reply(`${member.user.username} banned.`).catch(console.error);
        }).catch(console.error);
        break;

        //Add Distro to DB
        case prefix + 'distro add':
        case (msg.content.match(/\/distro add[a-zA-Z0-9 ]*/) || {}).input:
          if(isAdmin(msg.author.id)){
            var distroName = msg.content.replace(prefix + 'distro add', '').trim();
            distroName = mysql.escape(distroName);
            var results = addDistro(distroName);
          } else {
            return msg.reply('Not Authorized');
          }
    } // END Switch
  }
});

// Check if user is on the config.admin list
function isAdmin(userID){
  var adminFound = false;
  // Iterate throught the admin list for an ID match
  for (var i = 0;i < admins.length; i++) {
    if(admins[i].id == userID){
      // If match is found, returns true immediately
      adminFound = true;
      return adminFound;
    }else{
      // This user is not an admin, but continue to loop the list
      adminFound = false;
    }
  }
  // If no match is found, returns false
  return adminFound;
}

function addDistro(distroName){
  var result = dbquery("SELECT * FROM information_schema.tables WHERE table_schema = '"+db+"' AND table_name = 'distro' LIMIT 1;");
  console.log(result);
    if(result === "ER_TABLE_EXISTS_ERROR"){
        result = dbquery("INSERT IGNORE INTO distros SET name = "+distroName+";");
    }else{
        result = dbquery("CREATE TABLE 'distros' ('id' INT NOT NULL, 'name' VARCHAR(32) NOT NULL, PRIMARY KEY('id'));");
    }
    return result;
}

function dbquery(querystring){
  var result = connection.query(querystring, function (error, rows, fields) {
      if (error){
        return error.code;
      } else{
        result = rows;
      }
  });
}

// Read Discord token from file
client.login(config.token);
client.on('debug', console.log);
