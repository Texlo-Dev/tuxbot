const snekfetch = require('snekfetch')
const cheerio = require('cheerio')
const querystring = require('querystring')

exports.run = async (client, msg, [...query]) => {
  let searchMessage = await msg.reply('Searching....')
  let searchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`
  if (!query) return;
  return snekfetch.get(searchURL).then((result) => {
      let $ = cheerio.load(result.text)
      let googleData = $('.r').first().find('a').first().attr('href');

      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`Result found!\n${googleData.q}`);

  }).catch((err) => {
      throw err;
    searchMessage.edit('No results found!');
  });
};





exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "google",
  description: "Searches up whatever you'd like.",
  usage: "<query:str> [...]",
  usageDelim: " ",
  extendedHelp: "",
};
