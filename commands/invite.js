const Discord = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'Sends a permanent server invite.',
    cooldown: 2,
    execute(message, args, bot, color) {
        let embed1 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle('Our permanent invite link!')
        .setDescription('https://discord.gg/b4fw9uw');

        message.channel.send(embed1);
    },
};
