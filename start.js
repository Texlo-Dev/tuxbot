const Komada = require("komada");
const config = require('./config.json');

const client = new Komada.Client({
  ownerID: "288855795951599617",
  prefix: "tux",
  clientOptions: {
    fetchAllMembers: true,
  },
});

client.login(config.token);
