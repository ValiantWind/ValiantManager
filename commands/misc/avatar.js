const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');

module.exports = {
name: 'embed',
    UserPerms: ['MANAGE_MESSAGES'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
        const user = message.options.getUser('target');


        
	async execute(message) {
    const user = message.options.getUser('target');
		if (user) return message.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		return message.reply(`Your avatar: ${message.user.displayAvatarURL({ dynamic: true })}`);
	},
};