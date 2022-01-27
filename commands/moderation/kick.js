const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'kick',
    UserPerms: ["KICK_MEMBERS"],
    BotPerms: ["KICK_MEMBERS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {

        const user = message.mentions.members.first();
        const user2 = message instanceof Discord.CommandInteraction ? message.user : message.author;
        const embed = new Discord.MessageEmbed();


        if (user) {
            user.kick().then(() => {
              embed
              .setColor('#ff0000')
              .setDescription(`${user.username} was banned!`)
               // message.channel.send('Kicked!')
            })
        } else {
            message.channel.send('cannot find user')
        }

    }
}