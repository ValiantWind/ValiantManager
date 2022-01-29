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
        const embed = new MessageEmbed();


        if (user) {
            user.kick().then(() => {
              embed
              .setColor('##00aaff')
              .setDescription(`${user.username} was kicked!`)
              .setThumbnail(user.displayAvatarURL({dynamic : true}))
               message.channel.send({embeds: [embed] });
            })
        } else {
            message.channel.send(`I could not find ${user}`)
        }

    }
}