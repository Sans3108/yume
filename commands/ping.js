const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    description: 'PONG!',
    cooldown: 2,
    execute(message, args, bot, color) {
        const embed1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('Pinging...');

        message.channel.send(embed1).then(sent => {
            const embed1Edit = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Pong! :ping_pong:\nIt took me ${sent.createdTimestamp - message.createdTimestamp}ms`);
            
            sent.edit(embed1Edit)
        });
    },
};