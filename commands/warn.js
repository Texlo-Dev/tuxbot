const Discord = require('discord.js');
const Sequelize = require('sequelize');
const warnpoints = new Sequelize({
  dialect: 'sqlite',

  storage: './warnpoints.sqlite'
});

const warnList = warnpoints.define('warnList', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userID: {
    type: Sequelize.STRING
  },
  warnpoints: {
    type: Sequelize.INTEGER
  }
});

warnList.sync();

exports.run = async (client, msg, [warnUser, points, ...reason]) => {

  const modlog = client.channels.find('name', 'mod-logs');
  if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply("You don't have perms to warn people.").catch(console.error);
  if (!modlog) return msg.reply('I cannot find a mod-log channel.').catch(console.error);
  msg.delete(0);
  
  let dbEntry = await warnList.find({where:{userID:warnUser.id}});
  if(!dbEntry) {
    dbEntry = await warnList.create({userID:warnUser.id, warnpoints: points});
  } else {
  let totalPoints = dbEntry.warnpoints + points;
   userSnowflake = dbEntry.userID
    warnList.update({warnpoints:totalPoints}, {where: {userID: warnUser.id}}).catch(console.error)
  }
  
  warnUser.send(`You have been issued **${points}** warning points for the following reason: ${reason}`);
  const embed = new Discord.RichEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setThumbnail(warnUser.displayAvatarURL)
    .addField('User Warned', `${warnUser.username}#${warnUser.discriminator}`)
    .addField('Points:', points)
    .addField('Reason:', reason)
    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`);
  
  modlog.send({embed});


  totalPoints = dbEntry.warnpoints + points; 
  var kickNum = 400

  if (dbEntry.warnpoints < kickNum && totalPoints > kickNum) {
    warnUser.send('You have exceeded the soft limit for warnpoints here, and have been kicked from the server. You are welcome to rejoin, but understand that the next action is a ban.').then(() => {
    msg.guild.member(warnUser).kick();
   });
  } 


   if (totalPoints > 799) {
     warnUser.send('You have exceeded the hard limit for warnpoints here, and have been banned from the Discord chat.').then(() => {
     msg.guild.ban(warnUser);
    });
  }


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
  name: "warn",
  description: "warns a user.",
  usage: "<warnMember:user> <point:int> <reason:string> [...]",
  usageDelim: " ",
  extendedHelp: "",
};
