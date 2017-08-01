const Discord = require('discord.js')
exports.run = (client, member) => {
 if (!member.guild.me.hasPermission('BAN_MEMBERS')) return;
 const channel = member.guild.channels.find('name', 'member-logs');
  if (!channel) return;
  member.send(`Welcome, ${member.user.username} to our Discord Server! Please take some time and read #welcome for important info. We hope you enjoy your time here!`);
  try {
    const embed = new Discord.MessageEmbed()
    .setColor(3534687)
   .setTimestamp() 
   .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL({}))
   .setFooter('Joined')
   channel.send({embed})
  console.log(embed)
 } catch (e) {
  console.error(e)
 }
};
