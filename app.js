const komada = require("komada");
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('guildMemberAdd', member => {
    member.send(`Welcome, ${member.user.username} to the Linux Discord Server! Please take some time and read #welcome for important info. We hope you enjoy your time here!`);
});


komada.start({
  botToken: config.token,
  ownerID: "288855795951599617",
  prefix: "!", 
  clientOptions: {
    fetchAllMembers: true,
  },
});

