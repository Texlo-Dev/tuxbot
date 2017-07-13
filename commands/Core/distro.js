const {Database, Model} = require('mongorito')
const connection = new Database('localhost/tuxbot')
connection.connect()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(`Hmm..there was an error connecting with MongoDB.. ${err.stack}`))
class Distro extends Model {
      collection() {
          return ('distroLists')
      }

}
connection.register(Distro)

exports.run = async (client, msg) => {
    const args = msg.content.split(' ').slice(1)
    const flair = args.join(' ')
    if (!flair) return msg.reply('Please specify a distro name, silly!.')
    var nickname = msg.content.replace(`./distro`, '').trim();
          newNick = msg.author.username + ' [' + nickname + ']';

    
    let toAdd = await Distro.findOne({
        distro: flair
    })
    if (!toAdd) return msg.reply(`Sorry, the distro **${flair}** didn\'t exist. If you know its correct, contact a server admin to get it added.`)
     msg.member.setNickname(newNick).catch(console.error)
     msg.reply(`You have been successfully updated to **${flair}** :thumbsup:`)

}


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
  name: "distro",
  description: "sets your distro.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
