const Sequelize = require('sequelize')
const { cases } = require('../../settings/mysql-case.js')
const { caseList } = require('../../settings/caseList.js')
const { warnpoints } = require('../../settings/mysql-wp') 
const { warnList } = require('../../settings/warnList.js')
const { levels } = require('../../settings/mysql-leveling')
const { levelBoard } = require('../../settings/levelBoard')
const Discord = require('discord.js');

exports.run = async (client, msg) => {

     const user = msg.mentions.users.first();
     const args = msg.content.split(' ');
     const reason = args.slice(2).join(' ');
     const modlog = msg.guild.channels.find('name', 'mod-logs');
     if (!msg.member.hasPermission('BAN_MEMBERS')) {
         msg.delete(0); 
         return msg.reply("You don't have the permissions (BAN_MEMBERS) to do this.").catch(console.error);
      }
      if (msg.mentions.users.size === 0) { 
          msg.delete(4);
          return msg.reply('Please mention a user to ban.').catch(console.error);
      }      
      if (!modlog) return msg.reply('I cannot find a mod-log channel.');     
      if (reason.length < 1) {
          msg.delete();
         return msg.reply('No reason? Cmon now, give a reason.');
      }
     
      if (!msg.guild.member(user).bannable) return msg.reply('I cannot ban that member.');
      msg.delete(0);
      let caseEntry = await caseList.count({where:{guildID:msg.guild.id}})
      const caseInt = caseEntry + 1

     await user.send(`You have been banned from this server for the following reason: **${reason}**. If you feel like this was unjust, feel free to appeal this ban to **${msg.author.tag}**.`)
     await levelBoard.destroy({where: {guildID: msg.guild.id, userID: user.id}})
     caseList.create({
       caseNum: caseInt, 
       guildID: msg.guild.id, 
       userID: user.id, 
       action:'Ban', 
       modID: msg.author.id, 
       reasonFor: reason, 
       createdAt: msg.createdAt
       }).then((res) => { 
       msg.guild.ban(user, {days: 3})
       const embed = new client.methods.Embed()
	      .setColor(0xFF0000)
        .setTimestamp()
        .setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({}))
        .setThumbnail(user.displayAvatarURL('png'))
        .setDescription(`**Ban**\n\n**Member:** ${user.tag}\n\n**ID: **${user.id}\n\n**Reason:** ${reason}`)  
        .setFooter(`Case#${res.caseNum}`);
        msg.guild.channels.get(modlog.id).send({embed}).catch(console.error);
     });
     
};

exports.conf = {
  enabled: true,
  runIn: ["text"], // text only, which means Guild-only, so nobody can use this in DMs.
  aliases: [],
  permLevel: 2, // Limit it for moderators/administrators.
  botPerms: ["BAN_MEMBERS"], // Your bot requires BAN_MEMBERS permission to execute this command.
  requiredFuncs: [],
};



exports.help = {
  name: "ban", // Name of the command
  description: "Ban a user", // Command description
  usage: "", // Arguments User, which must be a mention or ID, and reason which is a string
  usageDelim: " ", // Arguments separated by space.
};
