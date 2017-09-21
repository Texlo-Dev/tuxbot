const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {Database, Model} = require('mongorito');
const connection = new Database('localhost/tuxbot');
connection.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(`Hmm..there was an error connecting with MongoDB.. ${err.stack}`));
class Distro extends Model {
    collection() {
        return ('distroLists');
    }

}
connection.register(Distro);

module.exports = class listDistro extends Command {
    constructor(client) {
        super(client, {
            name: 'help-distro',
            description: 'Shows all of the available distros.',
            memberName: 'help-distro',
            group: 'distro'
        });
    }

    async run (message) {
        let distros = await Distro.find();
        let str = distros.map(d => d.get('distro')).join(', ');
        const embed = new MessageEmbed()
            .setColor(0x8EE85F)
            .setTimestamp()
            .addField('distro', 'Adds your distro to your username.')  
            .addField('Syntax', "./distro <distroname>") 
            .addField('Availible Distros:', `${str}`)
            .setFooter(`Requested by ${message.author.tag}`); 
        message.author.send({embed});
        message.reply('Sent a DM :thumbsup:');
    }
};