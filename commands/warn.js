const Discord = require('discord.js');
const Sequelize = require('sequelize');
const warnpoints = new Sequelize({
  dialect: 'sqlite',

  storage: './warnpoints.sqlite'
});

const warnList = warnpoints.define('warnList', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: Sequelize.INTEGER
    },
    warnpoints: {
        type: Sequelize.INTEGER
    }
});

warnList.sync();

exports.run = (client, msg) => {

const args4 = msg.content.split(' ');
        let warnUser = msg.mentions.users.first();
        let userSnowflake2 = msg.mentions.users.first().id
        let points = args4[2];
        args4[3] = args4.slice(3).join(" ");
        const reason3 = args4[3];
        const modlog3 = client.channels.find('name', 'mod-logs');
        if (!msg.member.hasPermission('KICK_MEMBERS')) {
        msg.delete(0);
        return msg.reply("You don't perms to warn people.").catch(console.error);
        }
        if (!warnUser) {
        msg.delete(0);
        return msg.reply('Please mention a user to warn.').catch(console.error);
        }
        if (!modlog3) {
        msg.delete(0);
        return msg.reply('I cannot find a mod-log channel.').catch(console.error);
        }
        if (!points) {
        msg.delete(0);
        return msg.reply('How many points now? Please specify a number.').catch(console.error);
        }
        if (reason3.length < 1) {
        msg.delete(0);
        return msg.reply('No reason? Cmon now, give a reason.').catch(console.error);
        }
        msg.delete(0);       

        warnList.create({ userID: userSnowflake2, warnpoints: points }).then((res) => {
            const embed6 = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setThumbnail(warnUser.displayAvatarURL)
	    .addField('User Warned', `${warnUser.username}#${warnUser.discriminator}`)  
            .addField('Points:', points)
            .addField('Reason:', reason3)
	    .addField('Moderator:', `${msg.author.username}#${msg.author.discriminator}`);
            client.channels.get(modlog3.id).send({ embed: embed6 }).catch(console.error);
            warnUser.send('You have been issued' + ' ' + '**' +  points + '**' + ' ' + 'warning points for the following reason:' + ' ' + reason3);  
       });
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
  name: "warn",
  description: "warns a user.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
