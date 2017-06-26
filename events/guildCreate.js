exports.run = async (client, guild) => {
   console.log('Joined a server');
   client.user.setGame(`./help ~ serving ${client.guilds.size} servers`).catch(console.error);
   guild.fetchMember(guild.ownerID).then(member => member.send("Thank you for adding Tux to your server! Before using Tux, please configure the Moderator and Admin roles for your server by running the following commands: ./conf set modRole <nameofmodrole>` and ./conf set adminRole <adminrolename>, and you're all set to begin using Tux!"))
};
