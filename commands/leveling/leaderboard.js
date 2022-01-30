const Levels = require('discord-xp');

module.exports = {
    name: 'leaderboard',
    run: async (client, message, args) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        if (rawLeaderboard.length < 1) return message.reply('Nobody is in the leaderboard');

        const l = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`);
        message.reply({
            content: `${l.join("\n\n")}`
        })
    }
}