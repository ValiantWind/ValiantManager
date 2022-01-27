const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['exile'],
    UserPerms: ["BAN_MEMBERS"],
    BotPerms: ["BAN_MEMBERS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first();
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send('Tell me the reason!');

        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                message.channel.send('Banned!')
            })

        } else {
            message.channel.send('could not find the user!')
        }

    }
}