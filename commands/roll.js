const Roll = require('roll');
const roller = new Roll();
const RichEmbed = require('discord.js').RichEmbed;

exports.run = (client, msg) => {

   const args = msg.content.split(' '); 
   if (args.length < 1) {
        throw 'You must specify in dice notation (XdY)';
    }

    let reason = '';
    let footer = '';

    footer += `:game_die: **${args[0]}**`;
    if (args.length > 1) {
        reason = args.splice(1).join(' ');
        footer += ` | ${reason}`;
    }

    let results = roller.roll(args[0]);

    msg.delete();

    let message = new RichEmbed()
        .setColor(client.utils.randomColor())
        .setTitle(`Total: ${results.result}`)
        .setDescription(`${[].concat.apply([], results.rolled).join(', ')}`)
        .addField('\u200b', footer);

    msg.channel.sendEmbed(message);
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
  name: "roll",
  description: "rolls a die",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};


