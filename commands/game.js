const Discord = require("discord.js");

module.exports = {
    name: 'game',
    description: 'Are you ready for the challenge?',
    cooldown: 3,
    execute(message, args, bot, color) {
        const emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(`Click me to be redirected to the Bossfight mini-game.`)
        .setURL('https://sans3108.github.io/');

        message.channel.send(emb1);
    },
};