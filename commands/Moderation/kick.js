const Sequelize = require('sequelize')
const { cases } = require('../../settings/mysql_case-db.js')
const { caseList } = require('../../settings/caseList.js')

const Discord = require('discord.js');
exports.run = async (client, msg)  => {

      let args = msg.content.split(' ')     
      const modlog = msg.guild.channels.find('name', 'mod-logs');
      let user = msg.mentions.users.first();
      args[2] = args.slice(2).join(' ')
      const reason = args[2]
      if (!msg.member.hasPermission('KICK_MEMBERS')) {
          msg.delete(0);
          return msg.reply("You don't have the permissions (KICK_MEMBERS) to do this.").catch(console.error);
      }
       if (msg.mentions.users.size === 0) return msg.reply('Please mention a user to kick.').catch(console.error);
      if (!modlog) return msg.reply('I cannot find a mod-log channel.');
      if (reason.length < 1) return msg.reply('No reason? Cmon now, give a reason.');

      if (!msg.guild.member(user).kickable) return msg.reply('I cannot kick that member.');
      msg.delete(0);
      user.send(`You have been kicked from the server for the following reason: ${reason}. You are free to rejoin, but understand that the next action is a ban.`)
        caseList.create({userID: user.id, action:'kick', modID: msg.author.id, reasonFor: reason, createdAt: msg.createdAt}).then((res) => {  
        msg.guild.member(user).kick()
         const embed = new Discord.RichEmbed()
       	.setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(user.displayAvatarURL('png'))
	.addField('User Kicked', `${user.username}#${user.discriminator}`)  
        .addField('Reason for Kick:', reason)
	.addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`)
        .setFooter(`Case#${res.caseNum}`)
        msg.guild.channels.get(modlog.id).send({embed}).catch(console.error);
      });
};

exports.conf = {
  enabled: true,
  runIn: ["text"], // text only, which means Guild-only, so nobody can use this in DMs.
  aliases: [],
  permLevel: 2, // Limit it for moderators/administrators.
  botPerms: ["KICK_MEMBERS"], // Your bot requires BAN_MEMBERS permission to execute this command.
  requiredFuncs: [],
};


exports.help = {
  name: "kick", // Name of the command
  description: "kicks a user", // Command description
  usage: "",
  usageDelim: " ", // Arguments separated by space.
};
