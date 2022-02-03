const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');

module.exports = class GiveXPCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'givexp',
      aliases: ['gxp'],
      usage: 'givexp <user mention/ID> <exp count>',
      description: 'Gives the specified amount of your own experience to the mentioned user.',
      type: client.types.EXP,
      examples: ['givexp @ValiantWind 1000']
    });
  }
  run(message, args) {
    const member = this.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (!member) return this.sendErrorMessage(message, 0, 'Please mention a user or provide a valid user ID');
    if (member.id === message.client.user.id)
      return message.channel.send('Thank you, you\'re too kind! But I must decline. I prefer not to take handouts.');
    const amount = parseInt(args[1]);
    const xp = message.client.db.users.selectPoints.pluck().get(message.author.id, message.guild.id);
    if (isNaN(amount) === true || !amount)
      return this.sendErrorMessage(message, 0, 'Please provide a valid xp count');
    if (amount < 0 || amount > xp) return this.sendErrorMessage(message, 0, stripIndent`
      Please provide a xp count less than or equal to ${xp} (your total xp)
    `);
    // Remove xp
    message.client.db.users.updatePoints.run({ xp: -amount }, message.author.id, message.guild.id);
    // Add points
    const oldExp = message.client.db.users.selectPoints.pluck().get(member.id, message.guild.id);
    message.client.db.users.updatePoints.run({ xp: amount }, member.id, message.guild.id);
    let description;
    if (amount === 1) description = `Successfully transferred **${amount}** xp to ${member}!`;
    else description = `Successfully transferred **${amount}** xp to ${member}!`;
    const embed = new MessageEmbed()
      .setTitle(`${member.displayName}'s Exp`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(description)
      .addField('From', message.member, true)
      .addField('To', member, true)
      .addField('Points', `\`${oldExp}\` ➔ \`${amount + oldExp}\``, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);
    message.channel.send(embed);
  }
};