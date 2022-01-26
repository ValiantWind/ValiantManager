const Levels = require('discord-xp');
const {
    mongooseConnectionString
} = require("../config.json")
Levels.setURL(mongooseConnectionString);
const client = require('../index');

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    const randomxp = Math.floor(Math.random() * 10) + 1; // this is the amoumt of xp it will give.. so it will give random number from 0 to 10 multiple by 10 and adding 1.. u can reduce this.. by changing the 12 to smth else..
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomxp);
    if (hasLevelUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Congrats you just leveled up \`${user.level}\``)
    }
})


// Lets test it out