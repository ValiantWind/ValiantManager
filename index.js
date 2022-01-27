const express = require("express");
const app = express()
const { Collection, Client } = require('discord.js');
const client = new Client({
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
module.exports = client;

const { mongooseConnectionString } = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to mongodb!'))


client.prefix = process.env.PREFIX
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.functions = new Collection();
client.models = new Collection();


require('./handler')(client);


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
//client.on('ready', () => {
 //   console.log(`${client.user.tag} is now online!`)
//})

client.login(process.env.TOKEN);
