const Discord = require("discord.js");

module.exports = {
    name: 'join',
    description: 'Sends a bot invite link.',
    cooldown: 3,
    ownerOnly: true,
    execute(message, args, bot, color) {
        const emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`Invite me to a server!`)
        .setURL('https://discordapp.com/oauth2/authorize?client_id=596272235765825546&scope=bot&permissions=2146958847');

        message.channel.send(emb1);
    },
};
