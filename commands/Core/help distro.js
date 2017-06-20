const Discord = require('discord.js');

exports.run = (client, msg, prefix) => {

 const embed = new Discord.RichEmbed()
        .setColor(0x8EE85F)
        .setTimestamp()
        .addField('distro', 'Adds your distro to your username.')  
        .addField('Syntax', "!distro <distroname>") 
        .addField('Availible Distros:', 'Android\nAntergos\nArch\nArchbang\nArch Linux\nBlackArch\nCentOS\nDebian\nelementaryOS\nFedora\nGentoo\nKali\nKali Linux\nKubuntu\nLinux Mint\nLubuntu\nManjaro\nMint\nOpenBSD\nopenSUSE\nOracle Linux\nPuppy Linux\nRaspbian Jessie\nRedHat\nRemixOS\nUbuntu\nUbuntu Budgie\nUbuntu GNOME\nXubuntu')
        .setFooter(`Requested by ${msg.author.username}#${msg.author.discriminator}`); 
        msg.author.send({embed});
        msg.reply('Sent a DM :thumbsup:');
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
  name: "help-distro",
  description: "shows help info",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

