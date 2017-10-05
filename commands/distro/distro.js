const { Command } = require('discord.js-commando');
const {Database, Model} = require('mongorito');
const connection = new Database('localhost/tuxbot');
let roles = ['Ubuntu', 'Kali', 'Debian', 'Arch', 'OpenSUSE', 'RedHat', 'Fedora', 'Others', 'Manjaro', 'Antergos', 'Mint', 'elementaryOS'];
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
                type: 'role',
                default: ''

            }]
        });
    }

    async run (message, { distro }) {
        if (!distro) return message.reply('Sorry, no distro was specicied.');
        if (!roles.includes(distro.name)) return message.reply('Sorry, that wasn\'t a valid distro role.').then(m => m.delete({timeout: 3000}));
        if (message.channel.id !== '361120040524972032') return message.channel.send('All roles should be requested in #role-request.');
        message.delete();
        message.member.addRole(distro).catch(e => {
            return message.reply('Sorry, this role could not be assigned.').then(m => m.delete({timeout: 3000}));
        });
        message.reply(`You have been successfully updated to **${distro.name}** :thumbsup:`).then(m => m.delete({timeout: 3000}));


    }
};
