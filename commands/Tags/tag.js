const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
  const args = msg.content.split(' ').slice(1)
  const name = args.join(' ')
  if (!name) return msg.reply('Please specify a tag name to see.')
  
   const tag = await tagList.findOne({where: {tagName: name, guildID: msg.guild.id}})
   if (tag) {
     tag.increment('usage_count');
     return msg.channel.send(tag.get('tagContent'))
   }
   return msg.channel.send('Could not find that tag.')
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
  name: "tag",
  description: "displays a tag.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};

 