const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    const name = args.join(' ')

    const tag = await tagList.findAll({ attributes: ['tagName'], where: { guildID: msg.guild.id } });
   // console.log(tag)
    const tagString = tag.map(d => d.tagName).join(', ') || 'No tags were found, sorry.'
    const tagSorted = tagString.split(', ').sort().join(', ')
    /*console.log(tagString)
    console.log(tagSorted)*/
    return msg.channel.send(`**Available Tags:** ${tagSorted}`);
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
  name: "taglist",
  description: "lists all available tags.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};