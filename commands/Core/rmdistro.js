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
       const args = msg.content.split(' ')
       const dist = args.slice(1).join(1)
       if (!dist) return msg.reply('Please specify a distro to delete.')

       const query = await Distro.findOne({
         distro: dist
       })

       if (!query) return msg.reply('Oops! That distro wasn\'t in my records.')
       try {
         query.remove()
         return msg.reply(`Successfully deleted the distro **${dist}**.`)
       } catch (error) {
         return msg.reply(`Oops, there was an error! \`\`\`${err}\`\`\``)
       }
};

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
  name: "rmdistro",
  description: "Deletes a distro from the database.",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
