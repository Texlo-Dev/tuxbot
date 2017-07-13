const {Database, Model} = require('mongorito')
const connection = new Database('localhost/tuxbot')
connection.connect()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(`Hmm...thee was an error connecting to MongoDB... ${err.stack}`))

class Distro extends Model {
      collection() {
          return ('distroLists')
      }

}
connection.register(Distro)

exports.run = async (client, msg) => {
  const args = msg.content.split(' ').slice(1)
  if (!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('You don\'t have permissions to perform this operation.')
    const flair = args.join(' ')
    if (!flair) return msg.reply('Please specify a distro to add.')
    
    let toAdd = await Distro.findOne({
        distro: flair
    })
    if (toAdd) return msg.reply('That distro already exists.')
    let added = new Distro({
        distro: flair
    })
    added.save().then(() => msg.reply(`Successfully added **${flair}** to the database.`))

}


exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 2,
  botPerms: [],
  requiredFuncs: [],
  cooldown: 0,
};

exports.help = {
  name: "adddistro",
  description: "adds a distro to the database.",
  usage: "",
  usageDelim: " ",
  extendedHelp: "",
};
