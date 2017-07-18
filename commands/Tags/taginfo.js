const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    let name = args.join(' ')
    if (!name) return msg.reply('Please specify a tag name.')
     const tag = await tagList.findOne({where: {tagName: name, guildID: msg.guild.id}})
    if (tag) {
       const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Author: ${client.users.get(tag.tagAuthor).tag}`, `${client.users.get(tag.tagAuthor).displayAvatarURL({})}`)
        .addField('Tag name:', `${tag.tagName}`)
        .addField('Created At:', `${tag.createdAt}`)
        .addField('Usage Count:', `${tag.usage_count}`)
        .setTimestamp()
        msg.channel.send({embed})
   }
   else {
       return msg.reply(`Could not find the tag ${name}`)
   }
}

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
  name: "taginfo",
  description: "Displays tag info.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};
