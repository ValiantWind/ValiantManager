const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); // this will get the first 5 ppl
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        if (rawLeaderboard.length < 1) return message.reply('Nobody is in the leaderboard');

        const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`); // u can design this any way.. even by putting it in a embed 
        message.reply({
            content: `${l.join("\n\n")}`
        })
    }
}