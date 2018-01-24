const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');

const client = new CommandoClient({
    commandPrefix: './',
    owner: '288855795951599617',
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['role request', 'Role Request']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    client.user.setActivity(`./help`).catch(console.error);
    console.log(`- Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.author.id !== client.user.id && message.channel.id === "405552114170069003" && !message.content.startsWith(client.commandPrefix + 'agree')) return message.delete();
    if (message.channel.id === '361120040524972032') message.delete({timeout: 3000});

    if (message.author.id !== client.user.id && message.channel.id === "361120040524972032" && !message.content.startsWith(client.commandPrefix + 'agree')) return message.delete();
    if (message.channel.id === '361120040524972032') message.delete({timeout: 3000});
});


client.login(config.token);
