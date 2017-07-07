const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    const name = args.join(' ')
    if (!name) return msg.reply("Please specify a tag to edit.")
    const tag = await tagList.findOne({where: {tagName: name, guildID: msg.guild.id}})
    if (!tag) return msg.reply("That tag didn't exist.")
    if (tag.tagAuthor === msg.author.id || msg.member.hasPermission('BAN_MEMBERS')) { 
     await msg.reply('What would you like the new content to be?\n\nReply `cancel` to cancel the command. This command will be cancelled automatically in 60 seconds.')
    let filter = m => m.author.id
    msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        tagList.update({ tagContent: collected.first().content }, { where: { tagName: name, guildID: msg.guild.id } }).catch(err => msg.reply(`Sorry, couldn't find the tag ${name}.`))
        return msg.reply(`Tag ${name} was edited.`)
    })
  } else {
    return msg.reply("Oh, so you think you're slick trying to edit other people's tags...")
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
  name: "edittag",
  description: "edits a tag.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};