const Sequelize = require('sequelize')
const { levels } = require('../settings/mysql-leveling')
const { levelBoard } = require('../settings/levelBoard')
const Discord = require('discord.js')
exports.run = (client, member) => {
 if (!member.guild.me.hasPermission('BAN_MEMBERS')) return;
 const channel = member.guild.channels.find('name', 'member-logs');
 if (!channel) return;
 try {
    const embed = new Discord.RichEmbed()
   .setColor(0xFF0000)
   .setTimestamp()
   .setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL({}))
   .setFooter('Left')
   channel.send({embed})
  console.log(embed)
 } catch (e) {
  console.error(e)
 }
 levelBoard.destroy({where: {userID: member.user.id, guildID: member.guild.id }})

};


