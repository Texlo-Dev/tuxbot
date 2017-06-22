exports.run = async (client, guild) => {
   console.log('Joined a server');
   client.user.setGame(`./help ~ serving ${client.guilds.size} servers`).catch(console.error);
  // client.guilds.get(guild.id).owner.send("Thank you for adding Tux! Before using Tux, please have the guild owner configure the Moderator and Admin roles by doing the following: `./conf set modRole <nameofmodrole>` and `./conf set adminRole <adminrolename>`, and you're all set to begin using Tux!");
};
