const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Project is running!');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})
const config = require('./config.json');
const Discord = require('discord.js')
const {Client, Intents} = require('discord.js');
const ClientFile = require('./Client.js');

global.__basedir = __dirname;

const client = new Discord.Client(config, {intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
]
});
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