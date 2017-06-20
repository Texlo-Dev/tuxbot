var request = require("request-promise");
var select = require('soupselect').select,
    htmlparser = require("htmlparser");
var useragentmoz = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.898";
exports.run = (client, msg) => {
  const args = msg.content.split(' ').join();
  var url = "https://www.google.fi/search?site=imghp&tbm=isch&source=hp&biw=1680&bih=940&q=" +  args+"&oq=" + args;
  var options = {
    method: 'GET',
    useragent: useragentmoz,
    uri: url
  };
  request(options)
    .then(function (response) {
      console.log("WORK");
      //console.log(response);
      var handler = new htmlparser.DefaultHandler(function(err, dom) {
            if (err) {

          } else {
            var titles = select(dom, 'img');
            var urls = [];
            titles.forEach(function(title) {
              urls.push(title.attribs.src);
            });
            console.log(urls);
            msg.reply("**Your image:**");
            msg.channel.send(urls[1]);
          }
    });
     var parser = new htmlparser.Parser(handler);
     parser.parseComplete(response);
     return;
  }).catch(function (err) {
      console.log(err);
    });

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
  name: "image",
  description: "Command Description",
  usage: "",
  usageDelim: "",
  extendedHelp: "",
};
