const client = require('../index')
const links = require("../utils/scam.json");

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`)
})

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return 

    if (!message.content.startsWith(client.prefix)) return;
    const [cmd, ...args] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(" ");
    const Discord = require('discord.js')
    let command = client.commands.get(cmd)
   

    if (!command) command = client.commands.get(client.aliases.get(cmd))

    if (command) {
        // User Perms
        if (!message.member.permissions.has(command.UserPerms || [])) return message.channel.send(`You need \`${command.UserPerms || []}\` Permissions`)
        
        // Bot Perms
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.channel.send(`I need \`${command.BotPerms || []}\` Permissions`)

        await command.run(client, message, args, Discord)
    }
    for (const link of links) {
        if (message.content.includes(link)) {
          message.delete()
          message.channel.send(`${message.author}, please do not scam.`)
        }
      }
})