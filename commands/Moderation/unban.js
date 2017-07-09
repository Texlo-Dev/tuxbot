const Discord = require('discord.js')
const { cases } = require('../../settings/mysql-case.js')
const { caseList } = require('../../settings/caseList.js')
exports.run = async (client, msg, [ID]) => {
    const modlog = msg.guild.channels.find('name', 'mod-logs');
    const args = msg.content.split(' ');
   const reason = args.slice(2).join(' ');
   if (!reason) return msg.reply('Please specify a reason for the unban.') 
   let caseEntry = await caseList.count({where:{guildID:msg.guild.id}})
      const caseInt = caseEntry + 1
    
    msg.guild.unban(ID).then(user => {
    caseList.create({
      caseNum: caseInt,
      guildID: msg.guild.id,
      action: 'Unban',
      modID: msg.author.id,
      reasonFor: reason
    }).then((res) => {
        const embed = new Discord.RichEmbed()
        .setColor(0xFF4141)
        .setTimestamp()
        .setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({}))
        .setThumbnail(user.displayAvatarURL('png'))
        .setDescription(`**Unban**\n\n**Member:** ${user.tag}\n\n**ID: **${user.id}\n\n**Reason:** ${reason}`)  
        .setFooter(`Case#${res.caseNum}`);
        msg.delete()
        modlog.send({embed})
    })

 }).catch(err => msg.reply("Couldn't unban that user."))
}

exports.conf = {
  enabled: true,
  runIn: ["text"], // text only, which means Guild-only, so nobody can use this in DMs.
  aliases: [],
  permLevel: 2, // Limit it for moderators/administrators.
  botPerms: ["BAN_MEMBERS"], // Your bot requires BAN_MEMBERS permission to execute this command.
  requiredFuncs: [],
};



exports.help = {
  name: "unban", // Name of the command
  description: "Unban a user", // Command description
  usage: "<ID:user>", // Arguments User, which must be a mention or ID, and reason which is a string
  usageDelim: " ", // Arguments separated by space.
};
