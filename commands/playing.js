const Discord = require("discord.js");

module.exports = {
	name: 'playing',
	description: 'Sets the bot rich presence until the next restart.',
	aliases: ['presence'],
	usage: '[type] [message]',
	cooldown: 3,
	//guildOnly: true,
	ownerOnly: true,
	//args: true,
	execute(message, args, bot, color) {

		//embeds for the messages
		const embed1 = new Discord.RichEmbed()
		.setColor(color.red)
		.setDescription(`Provide a valid rich presence type. \`\`Listening\`\` \`\`Playing\`\` \`\`Watching\`\``);
		const embed2 = new Discord.RichEmbed()
		.setColor(color.red)
        .setDescription(`Provide a valid rich presence message.`);

        if (!args[0]) return message.channel.send(embed1);
        if (!args[1]) return message.channel.send(embed2);

        const type = `${args[0]}`
        const msg = `${args.slice(1).join(' ')}`

        if(type.toLowerCase() === 'listening') {
            bot.user.setPresence({
                game: {
                    name: `${msg}`,
                    type: "LISTENING"
                }
            });
        const embed3 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`Success! Changed the bot rich presence to:\n\`\`Listening to ${msg}\`\``);
        message.channel.send(embed3);

        } else if(type.toLowerCase() === 'playing') {
            bot.user.setPresence({
                game: {
                    name: `${msg}`,
                    type: "PLAYING"
                }
            });
        const embed4 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`Success! Changed the bot rich presence to:\n\`\`Playing ${msg}\`\``);
        message.channel.send(embed4);

        } else if(type.toLowerCase() === 'watching') {
            bot.user.setPresence({
                game: {
                    name: `${msg}`,
                    type: "WATCHING"
                }
            });
        const embed5 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`Success! Changed the bot rich presence to:\n\`\`Watching ${msg}\`\``);
        message.channel.send(embed5);

        } else return message.channel.send(embed1);
    },
}