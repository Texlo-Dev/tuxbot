exports.run = (client, oldMessage, newMessage) => {
      if (newMessage.content.match(/discord(.gg|app.com\/invite\/[a-z0-9]{7})/)) {
      newMesssage.delete().then(m => m.author.send('Please do not post Discord invites here.'))
  }
 }

