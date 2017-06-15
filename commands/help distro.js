const Discord = require('discord.js');

exports.run = (client, msg, prefix) => {

 const embed = new Discord.RichEmbed()
        .setColor(0x8EE85F)
        .setTimestamp()
        .addField('distro', 'Adds your distro to your username.')  
        .addField('Syntax', "!distro <distroname>") 
        .addField('Availible Distros:', 'Arch Linux\nArch\nRaspbian Jessie\nUbuntu\nMint\nLinux Mint\nAntergos\nDebian\nManjaro\nopenSUSE\nFedora\nelementaryOS\nCentOS\nKali\nKali Linux\nPuppy Linux\nXubuntu\nKubuntu\nLubuntu\nAndroid\nArchbang\nRemixOS\nRedHat\nUbuntu GNOME\nBlackArch\nOpenBSD\nOracle Linux\nGentoo\nUbuntu Budgie')
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
  name: "help,distro",
  description: "shows help info",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};

