const { Command } = require('discord.js-commando');
let roles = ['Ubuntu', 'Kali', 'Debian', 'Arch', 'OpenSUSE', 'RedHat', 'Fedora', 'Others', 'Manjaro', 'Antergos', 'Mint', 'elementaryOS', 'Kernel', 'Void'];

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
                prompt: 'What distro would you like to leave?',
                type: 'role',
                default: 'n',
                wait: 1

            }]
        });
    }

    async run (message, { distro }) {
        if (!distro) return message.reply('Sorry, no distro was specicied.');
        if (!roles.includes(distro.name)) return message.reply('Sorry, that wasn\'t a valid distro role.');
        if (message.channel.id !== '361120040524972032') return message.channel.send('All role removals should be requested in #role-request.');
        message.delete();
        message.member.removeRole(distro).catch(e => {
            return message.reply('Sorry, this role could not be removed.');
        });
        message.reply(`You have been successfully removed from **${distro.name}** :thumbsup:`);

    }
};
