const { Command } = require('discord.js-commando');
module.exports = class AgreeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'agree',
            description: 'Agree to the server rules.',
            group: 'misc',
            memberName: 'agree'
        });
    }

    async run(message) {
        await message.delete();
        if (message.channel.id !== '405552114170069003') return;
        if (!message.member.roles.has('405551926587949096')) return;
        message.member.removeRole('405551926587949096');
        message.member.addRole('405182476525371404');
        message.reply('You have agreed to the server rules!').then(m => m.delete({timeout: 2000}));
    }
}