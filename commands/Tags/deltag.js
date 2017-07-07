const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    const name = args.join(' ')
    if (!name) return msg.reply('Please specify a tag to delete.')
    const tag = await tagList.findOne({where: {tagName: name, guildID: msg.guild.id}})
     if (msg.author.id === tag.tagAuthor || msg.member.hasPermission("BAN_MEMBERS")) {
      const rowCount = await tagList.destroy({ where: { tagName: name, guildID: msg.guild.id } });
      if (!rowCount) return msg.reply('That tag did not exist.');
   return msg.reply(`Successfully deleted the tag ${name}.`);
  } else {
      return msg.reply("Now why would I let you delete other people's tags?")
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
  name: "deltag",
  description: "Deletes a tag.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};
