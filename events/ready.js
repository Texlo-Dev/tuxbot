exports.run = (client) => {
    client.user.setGame(`./help ~ serving ${client.guilds.size} servers`).catch(console.error);
    console.log(`- Logged in as ${client.user.tag}!`);
};
