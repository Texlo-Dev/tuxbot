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

module.exports = class AddDistro extends Command {
    constructor(client) {
        super(client, {
            name: 'adddistro',
            description: 'Adds a distro to the database.',
            memberName: 'adddistro',
            group: 'distro',
            args: [{
                key: 'distro',
                prompt: 'What distro would you like to add to the database?',
                type: 'string'
            }]
        });
    }

    hasPermission(message) {
        return message.member.hasPermission('MANAGE_GUILD');
    }

    async run (message, { distro }) {
        let toAdd = await Distro.findOne({
            distro
        });
        if (toAdd) return message.reply('That distro already exists.');
        let added = new Distro({
            distro
        });
        added.save().then(() => message.reply(`Successfully added **${distro}** to the database.`));

    }
};