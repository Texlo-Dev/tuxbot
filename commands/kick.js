const Discord = require('discord.js');
exports.run = (client, msg) => {

      const args2 = msg.content.split(' ');
      const modlog2 = client.channels.find('name', 'mod-logs');
      let user2 = msg.mentions.users.first();
      const reason2 = args2.slice(2).join(' ');
      if (!msg.member.hasPermission('KICK_MEMBERS')) {
          msg.delete(0);
          return msg.reply("You don't have the permissions (KICK_MEMBERS) to do this.").catch(console.error);
      }
      if (!modlog2) return msg.reply('I cannot find a mod-log channel.');
      if (reason2.length < 1) return msg.reply('No reason? Cmon now, give a reason.');
      if (msg.mentions.users.size < 1) return msg.reply('Please mention a user to kick.').catch(console.error);

      if (!msg.guild.member(user2).kickable) return msg.reply('I cannot kick that member.');
      msg.delete(0);
      msg.guild.member(user2).kick();

      const embed3 = new Discord.RichEmbed()
	.setColor(0xFF0000)
        .setTimestamp()
        .setThumbnail(user2.avatarURL)
	.addField('User Kicked', `${user2.username}#${user2.discriminator}`)  
        .addField('Reason for Kick:', reason2)
	.addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`);
      return client.channels.get(modlog2.id).send({embed: embed3 });
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
