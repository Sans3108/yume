const Discord = require("discord.js");
const { prefix } = require("../prefix.json");

module.exports = {
	name: 'purge',
	description: 'Purge a specified number of messages from a channel.',
	aliases: ['clear', 'clean'],
	usage: '[number]',
	cooldown: 3,
	guildOnly: true,
	staff: true,
	args: true,
	execute(message, args, bot, color) {
		const perms = ["MANAGE_MESSAGES"]

		//embeds for the messages
		const embed1 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`You shall get permissions first! (\`${perms}\`)`);
		const embed2 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`Please provide a valid number of messages so I can delete them!`);
		const embed3 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`Please specify a number between 1 and 99!`);
		const embed4 = new Discord.RichEmbed()
			.setColor(color);
		const embed5 = new Discord.RichEmbed()
			.setColor(color);

		if (!message.member.hasPermission(perms)) return message.channel.send(embed1);

		if (isNaN(args[0])) return message.channel.send(embed2);
		if (args[0] > 99 || args[0] < 1) return message.channel.send(embed3);

		message.channel.bulkDelete(Number(args[0]) + Number(1))
			.then(messages => {
				embed4.setDescription(`_Successfully deleted ${Number(messages.size) - Number(1)}/${args[0]} messages._`) && message.channel.send(embed4)
					.then(msg => msg.delete(2500))

				//mod log
				let modch = message.guild.channels.find(ch => ch.name === 'reports');
				let modemb = new Discord.RichEmbed()
				.setTitle(`New Mod Log: (${prefix}purge)`)
				.setDescription(`\`\`${message.author.tag}\`\` purged ${Number(messages.size) - Number(1)}/${args[0]} messages in <#${message.channel.id}>.`);
				modch.send(modemb);
			})
			.catch(error => embed5.setDescription(`There was a error, sorry about that.`).addField(`The error looks like this:`, `\`\`\`${error.message}\`\`\``) && message.channel.send(embed5));
	},
}