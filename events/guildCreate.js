exports.run = (client, guild) => {
   client.user.setGame(`./help ~ serving ${client.guilds.size} servers`).catch(console.error);
};
