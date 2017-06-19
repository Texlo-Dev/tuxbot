exports.run = (client, guild) => {
   client.user.setGame(`on ${client.guilds.size} servers`).catch(console.error);
};
