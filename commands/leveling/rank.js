const Discord = require('discord.js');
const Levels = require('discord-xp')
const canvacord = require('canvacord')
module.exports = {
    name: 'rank',
    run: async (client, message, args) => {
        const target = message.mentions.users.first() || message.author
        let memberTarget = message.guild.members.cache.get(target.id);
        const user = await Levels.fetch(target.id, message.guild.id, true);
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        const gradient = Canvacord.Canvas.gradient("red", "blue", 934, 282);
        
        if (user.length < 1) return message.reply({
            content: `${process.env.FAILURE_EMOJI} You don't have xp. Send messages to gain some xp!`,

        })
        const rank = new canvacord.Rank()
            .setAvatar(memberTarget.user.displayAvatarURL({
                dynamic: false,
                format: 'png'
            }))
            .setCurrentXP(user.xp)
            .setLevel(user.level || 0)
            .setRequiredXP(neededXp)
            .setRank(user.position)
            .setStatus('online')
            .setProgressBar('##278be8', 'COLOR')
            .setUsername(memberTarget.user.username)
            .setDiscriminator(memberTarget.user.discriminator)
            .setBackground("IMAGE", "C:/Users/Pavan/Downloads/DomRoblox-Icon.jpg")


        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "rankcard.png");
                message.reply({
                    files: [attachment],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            });

    }
}