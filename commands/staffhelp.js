const Discord = require("discord.js");
const { prefix } = require('../prefix.json');

module.exports = {
	name: 'staffhelp',
	description: 'List all of my Staff commands or info about a specific command.',
	aliases: ['staffcommands', 'staffcmds', 'staff-help'],
	usage: '[command name]',
	cooldown: 5,
  staff: true,
	execute(message, args, bot, color) {
		const data = [];
		const { commands } = message.client;

		//embeds
		const embed1 = new Discord.RichEmbed()
		.setColor(color)
		.setDescription('I\'ve sent you a DM with all my staff commands!');

		const embed2 = new Discord.RichEmbed()
		.setColor(color)
		.setDescription('It seems like I can\'t DM you!');

		const embed3 = new Discord.RichEmbed()
		.setColor(color)
		.setDescription('That command does not exist... try again?');

		if (!args.length) {
			data.push('**Here\'s a list of all my staff commands:**\n_');
			data.push(commands.filter(c => c.staff).map(command => command.name).join('_ | _'));
			data.push(`_\nYou can send \`${prefix}staffhelp [command name]\` to get info on a specific command!`);

			const embed5 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(data, { split: true })
      .setFooter(`Tip: use ${prefix}cmds to find different help sections.`);

			return message.author.send(embed5)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply(embed1);
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply(embed2);
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply(embed3);
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		const embed4 = new Discord.RichEmbed()
		.setColor(color)
		.setDescription(data, { split: true });

		message.channel.send(embed4);
	},
};
