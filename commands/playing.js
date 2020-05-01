const Discord = require("discord.js");

module.exports = {
	name: 'playing',
	description: 'Sets the bot rich presence until the next restart.',
	aliases: ['presence'],
	usage: '[type] <url> [message]',
	cooldown: 3,
	//guildOnly: true,
	ownerOnly: true,
	//args: true,
	execute(message, args, bot, color) {

		//embeds for the messages
		const embed1 = new Discord.RichEmbed()
		.setColor(color.red)
		.setDescription(`Provide a valid rich presence type. \`\`Listening\`\` \`\`Playing\`\` \`\`Watching\`\` \`\`STREAMING\`\``);
		const embed2 = new Discord.RichEmbed()
		.setColor(color.red)
        .setDescription(`Provide a valid rich presence message.`);

        if (!args[0]) return message.channel.send(embed1);
        if (!args[1]) return message.channel.send(embed2);

        const type = `${args[0]}`

        if(type.toLowerCase() === 'listening') {
          const msg = `${args.slice(1).join(' ')}`
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
          const msg = `${args.slice(1).join(' ')}`
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
          const msg = `${args.slice(1).join(' ')}`
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

        } else if(type.toLowerCase() === 'streaming') {
          const url = `${args[1]}`
          const msg = `${args.slice(2).join(' ')}`
          bot.user.setPresence({
                game: {
                    name: `${msg}`,
                    type: "STREAMING",
                    url: `${url}`
                }
            });
          const embed6 = new Discord.RichEmbed()
            .setColor(color.green)
            .setDescription(`Success! Changed the bot rich presence to:\n\`\`Streaming ${msg}\`\`\n(Url: ${url})`);
          message.channel.send(embed6);
        } else return message.channel.send(embed1);
    },
}