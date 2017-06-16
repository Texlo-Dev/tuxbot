exports.run = (client) => {
    console.log(`- Logged in as ${client.user.tag}!`);
    console.log(`- Guilds: ${client.guilds.size}`);
    console.log(`- Channels: ${client.channels.size}`);
    client.user.setGame('with a Terminal').catch(console.error);
};
