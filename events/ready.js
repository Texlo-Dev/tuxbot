exports.run = (client) => {
    client.user.setGame(`on ${client.guilds.size} servers ~ "tuxhelp"`).catch(console.error);
    console.log(`- Logged in as ${client.user.tag}!`);
};
