const Sequelize = require('sequelize');
const distros = new Sequelize({
  dialect: 'sqlite',

  storage: './database.sqlite',

  logging: false
});

const distroList = distros.define('distroList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    distro: {
        type: Sequelize.STRING
    }
});

distroList.sync();

exports.run = async (client, msg, [distroName]) => {
  distroList.create({distro:distroName}) 
  msg.reply('Distro successfully added to the database.').catch(err => {
   return msg.reply('There was an error in adding that distro.')
  });
 
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "adddistro",
  description: "adds a distro to the database.",
  usage: "<distroName:str>",
  usageDelim: " ",
  extendedHelp: "",
};
