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

exports.run = async (client, msg, prefix) => {

        var nickname = msg.content.replace('tuxdistro', '').trim();
          newNick = msg.author.username + ' [' + nickname + ']';

          // Check if distro exists
      let args3 = msg.content.split(' ');
      USERINPUT = args3.slice(1).join(' ');
      distroList.find({where:{distro:USERINPUT}}).then((res) => {
    if(res === null) {
            //false
    } else {
        //true
    }});


    

      // Remove distro
          if (nickname.length === 0) {
              msg.member.setNickname(msg.author.username).catch(console.error);
              msg.reply('Distro removed').catch(console.error);
          }
          // Check for length limit
          else if (newNick.length > 32) {
              msg.reply('Distro too long').catch(console.error);
          }
          // Set distro
         else {
distroList.find({where:{distro:USERINPUT}}).then((res) => {
    if(res === null) {
            msg.reply(`Sorry, the distro **${USERINPUT}** is invalid. If you know it's correct, contact a server admin to get it added.`);

     } else {
          msg.member.setNickname(newNick).catch(console.error);
              msg.reply(`Nickname updated, you have been added to **${USERINPUT}** :thumbsup:`).catch(console.error);
     }});
}};

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
  name: "distro",
  description: "sets your distro.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
