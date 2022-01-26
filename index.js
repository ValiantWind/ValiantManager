const express = require("express");
const app = express()
const { Collection, Client } = require('discord.js');
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
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
    ],
});
module.exports = client;
client.commands = new Collection();
client.prefix = process.env.PREFIX

require('./handler')(client);

//client.on('ready', () => {
 //   console.log(`${client.user.tag} is now online!`)
//})

client.login(process.env.TOKEN);
