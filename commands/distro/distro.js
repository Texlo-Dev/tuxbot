const { Command } = require('discord.js-commando');
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

module.exports = class DistroCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'distro',
            group: 'distro',
            memberName: 'distro',
            description: 'Adds a distro to your username.',
            example: ['distro ubuntu'],
            args: [{
                key: 'distro',
                prompt: 'What distro would you like to add?',
                type: 'string',
                default: ''
            }]
        });
    }

    async run (message, { distro }) {
        if (!distro) {
            message.member.setNickname(message.author.username);
            return message.reply('Your distro has been reset!');
        }
        let newNick;
        var nickname = message.content.replace(`./distro`, '').trim();
        newNick = message.author.username + ' [' + nickname + ']';

    
        let toAdd = await Distro.findOne({
            distro
        });
        if (!toAdd) return message.reply(`Sorry, the distro **${distro}** didn't exist. If you know its correct, contact a server admin to get it added.`);
        message.member.setNickname(newNick).catch(e => message.reply('Sorry, I cannot change your nickname.'));
        message.reply(`You have been successfully updated to **${distro}** :thumbsup:`);
    }
};