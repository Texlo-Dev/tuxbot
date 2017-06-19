exports.run = (client) => {
    client.user.setGame(`on ${client.guilds.size} servers`).catch(console.error);
    console.log(`- Logged in as ${client.user.tag}!`);
    console.log(`- Guilds: ${client.guilds.size}`);
    console.log(`- Channels: ${client.channels.size}`);
};
