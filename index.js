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
        ['distro', 'Distro']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    client.user.setActivity(`./help`).catch(console.error);
    console.log(`- Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.channel.id === "361120040524972032" && !message.content.startsWith(client.commandPrefix)) return message.delete();
});


client.login(config.token);