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

module.exports = class RmDistro extends Command {
    constructor(client) {
        super(client, {
            name: 'rmdistro',
            description: 'Removes a distro from the database.',
            memberName: 'rmdistro',
            group: 'distro',
            examples: ['rmdistro Arch'],
            args: [{
                key: 'distro',
                prompt: 'What distro would you like to remove from the database?',
                type: 'string'
            }]
        });
    }

    hasPermission(message) {
        return message.member.hasPermission('MANAGE_GUILD');
    }

    async run (message, { distro }) {
        const query = await Distro.findOne({
            distro
        });

        if (!query) return message.reply('Oops! That distro wasn\'t in my records.');
        try {
            query.remove();
            return message.reply(`Successfully deleted the distro **${distro}**.`);
        } catch (error) {
            return message.reply(`Oops, there was an error! \`\`\`${error}\`\`\``);
        }

    }
};