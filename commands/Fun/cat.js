exports.run = async (client, msg, [message]) => {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://random.cat/meow", false ); // false for synchronous request
    xmlHttp.send( null );
    var obj = JSON.parse(xmlHttp.responseText);
	msg.channel.send("Cat: " + obj.file);
	
}