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
        const embed = new Discord.MessageEmbed();
        if (!reason) return message.channel.send('Tell me the reason!');

        if (user) {

            await user.ban({
                reason: reason,
            }).then(() => {
                embed
              .setColor('#ff0000')
              .setDescription(`${user.username} was kicked!`)
            })

        } else {
            message.channel.send('I could not find the user!')
        }

    }
}

