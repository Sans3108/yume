const Discord = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'Sends a permanent server invite.',
    cooldown: 2,
    guildOnly: true,
    execute(message, args, bot, color) {
        let embed1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('https://discord.gg/b4fw9uw');

        message.channel.send(embed1);
    },
};
