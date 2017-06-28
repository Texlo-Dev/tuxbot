const Sequelize = require('sequelize');
const distros = new Sequelize({
  dialect: 'sqlite',

  storage: './sqlite/database.sqlite',

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
       const dist = await distroList.destroy({where:{distro: distroName}});
       if (!dist) return msg.reply("Er...that distro didn't exist. Please specify a valid distro to delete.");
   
       return msg.reply(`Successfully deleted **${distroName}** from the database.`);
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
  name: "rmdistro",
  description: "Deletes a distro from the database.",
  usage: "<distroName:str>",
  usageDelim: "",
  extendedHelp: "",
};
