const Levels = require('discord-xp');
const {
    mongooseConnectionString
} = require("../config.json")
Levels.setURL(mongooseConnectionString);
const client = require('../index');

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const randomxp = Math.floor(Math.random() * 10) + 1;
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congrats you just leveled up \`${user.level}\``)
    }
})