const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        const embed = new Discord.MessageEmbed();
        const user = message instanceof Discord.CommandInteraction ? message.user : message.author;

            embed
            .setColor('#ff0000')
            .setTitle('Embed')
            //.setAuthor(user.username)
            .setDescription('This is a embed')
            .setThumbnail(user.displayAvatarURL({dynamic : true}))
            .addFields(
                { name: 'Field 1', value: 'hi' },
            )
            .addField('Field 4', 'sup')
            .addField('Field 5', 'hello')
            .setTimestamp()
           /// .setFooter('footer', 'https://media.discordapp.net/attachments/847794443180048394/872013597998465064/New_Project.png?width=606&height=606');

        message.channel.send({ content: 'this is a embed', embeds: [embed] });
    }
}