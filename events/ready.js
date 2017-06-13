exports.run = (client) => {
    
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setGame('with a Terminal').catch(console.error);
};
