const Discord = require("discord.js");
const { prefix } = require('../prefix.json');

module.exports = {
	name: 'devhelp',
	description: 'List all of my DEVELOPER commands or info about a specific command.',
	aliases: ['devcommands', 'devcmds', 'dev-help'],
	usage: '[command name]',
	cooldown: 5,
	ownerOnly: true,
	execute(message, args, bot, color) {
		const data = [];
		const { commands } = message.client;

		//embeds
		const embed1 = new Discord.RichEmbed()
		.setColor(color.green)
		.setDescription('I\'ve sent you a DM with all my Developer commands!');

		const embed2 = new Discord.RichEmbed()
		.setColor(color.red)
		.setDescription('It seems like I can\'t DM you!');

		const embed3 = new Discord.RichEmbed()
		.setColor(color.red)
		.setDescription('That command does not exist... try again?');

		if (!args.length) {
			data.push('**Here\'s a list of all my developer commands:**\n');
			data.push(commands.filter(c => c.ownerOnly).map(command => '_`' + prefix + command.name + '`_' + ` - ${command.description}`).join('\n'));

			const embed5 = new Discord.RichEmbed()
			.setColor(color.blue)
			.setDescription(data, { split: true })
      .setFooter(`You can send "${prefix}devhelp [command name]" to get info on a specific command!`);

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

		const timeLeft = command.cooldown || 3
    let hours = Math.floor(timeLeft / 3600);
    let r1 = timeLeft % 3600;
    let minutes = Math.floor(r1 / 60);
    let seconds = Math.floor(r1 % 60);
      
    let finalTime;
      
    if(hours !== 0 && minutes !== 0 && seconds !== 0) {
      finalTime = `${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
    } else if(hours !== 0 && minutes !== 0 && seconds === 0) {
      finalTime = `${hours} hour(s) and ${minutes} minute(s)`;
    } else if(hours !== 0 && minutes === 0 && seconds === 0) {
      finalTime = `${hours} hour(s)`;
    } else if(hours !== 0 && minutes === 0 && seconds !== 0) {
      finalTime = `${hours} hour(s) and ${seconds} second(s)`;
    } else if(hours === 0 && minutes !== 0 && seconds !== 0) {
      finalTime = `${minutes} minute(s) and ${seconds} second(s)`;
    } else if(hours === 0 && minutes !== 0 && seconds === 0) {
      finalTime = `${minutes} minute(s)`;
    } else if(hours === 0 && minutes === 0 && seconds === 0) {
      finalTime = `Less than a second`;
    } else if(hours === 0 && minutes === 0 && seconds !== 0) {
      finalTime = `${seconds} second(s)`;
    } else {
      finalTime = '`You should not see this message, contact Sans ASAP!!!`';
    }

		data.push(`**Cooldown:** ${finalTime}`);

		const embed4 = new Discord.RichEmbed()
		.setColor(color.blue)
		.setDescription(data, { split: true });

		message.channel.send(embed4);
	},
};
