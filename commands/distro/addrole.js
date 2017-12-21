const { Command } = require('discord.js-commando');
let roles = ['Ubuntu', 'Kali', 'Debian', 'Arch', 'OpenSUSE', 'RedHat', 'Fedora', 'Others', 'Manjaro', 'Antergos', 'Mint', 'elementaryOS', 'News', 'Void', 'Showcase Contestant', 'Gentoo', 'Slackware'];

module.exports = class DistroCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addrole',
            group: 'role request',
            memberName: 'addrole',
            description: 'Adds a role to your collection.',
            example: ['distro ubuntu'],
            args: [{
                key: 'distro',
                prompt: 'What role would you like to add?',
                type: 'role',
                default: 'n',
                wait: 1

            }]
        });
    }

    async run (message, { distro }) {
        if (!distro) return message.reply('Sorry, no distro was specicied.');
        if (!roles.includes(distro.name)) return message.reply('Sorry, that wasn\'t a valid role.');
        if (message.channel.id !== '361120040524972032') return message.channel.send('All roles should be requested in #role-request.');
        message.delete();
        message.member.addRole(distro).catch(e => {
            return message.reply('Sorry, this role could not be assigned.');
        });
        message.reply(`You have been successfully updated to **${distro.name}** :thumbsup:`);

    }
};
