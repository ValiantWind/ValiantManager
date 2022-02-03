const Client = require('./Client.js');
const config = require('./config.json');
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Project is running!');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})


const { Collection, Intents } = require('discord.js');
const intents = new Intents({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
        "GUILD_SCHEDULED_EVENTS",
    ],
});
const client = new Client(config, { ws: { intents: intents } });
//module.exports = client;

require('dotenv').config()
const mongooseConnectionString  = (process.env.MongooseConnectionString);
const mongoose = require("mongoose");
mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to mongodb!'))


client.prefix = config.prefix

require('./handler')(client);

// Initialize client
function init() {
    client.loadEvents('./events');
    client.loadCommands('./commands');
    client.login(process.env.TOKEN);
  }
  
  init();
  
  process.on('unhandledRejection', err => client.logger.error(err));


//client.on('ready', () => {
 //   console.log(`${client.user.tag} is now online!`)
//})