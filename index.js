const Discord = require("discord.js");
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content === 'windows') {
    msg.reply('Please do not mention that here!');
  }
});


client.login('MzA0NjI5OTUzMDU0NTA3MDE4.C9raMg.n6MCux9Vr05nNNlYY3PR_8Z5dHQ');
