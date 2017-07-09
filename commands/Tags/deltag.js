const Sequelize = require('sequelize')
const { tags } = require('../../settings/mysql-tags')
const { tagList } = require('../../settings/tagList')
const Discord = require('discord.js')

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    const name = args.join(' ')
    if (!name) {
      const filter = m => m.author.id === msg.author.id
      await msg.reply('What tag would you like to delete?\n\nReply `cancel` to cancel this command. This command will be cancelled in 30 seconds.')
      msg.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']})
      .then(collected => {
         if (collected.first().content === 'cancel') return msg.reply('Cancelled command.')
         tagList.destroy({
           where: {guildID: msg.guild.id, tagName: collected.first().content, tagAuthor: msg.author.id}
         }).then(() => msg.reply(`Succesfully deleted the tag ${collected.first().content}.`)).catch(err => msg.reply(`Sorry, I couldn't delete that tag, there was an error....\`\`\`${err.stack}\`\`\``))
      }).catch(err => msg.reply('Cancelled command.'))
  
    } else {
    const tag = await tagList.findOne({where: {tagName: name, guildID: msg.guild.id}})
     if (msg.author.id === tag.tagAuthor || msg.member.hasPermission("BAN_MEMBERS")) {
      const rowCount = await tagList.destroy({ where: { tagName: name, guildID: msg.guild.id } });
      if (!rowCount) return msg.reply('That tag did not exist.');
   return msg.reply(`Successfully deleted the tag ${name}.`);
  } else {
      return msg.reply("Now why would I let you delete other people's tags?")
    }
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
