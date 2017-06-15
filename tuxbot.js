const komada = require("komada");
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('debug', console.log);
const config = require("./config.json");

komada.start({
  botToken: config.token,
  ownerID: "288855795951599617",
  prefix: "!", 
  clientOptions: {
    fetchAllMembers: true,
  },
});

