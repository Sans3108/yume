const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
	name: 'kick',
	description: 'Kick a member from the server with a optional reason.',
	usage: '[@member] <reason>',
	cooldown: 5,
	guildOnly: true,
	args: true,
	execute(message, args, bot, color) {
		const perms = ["KICK_MEMBERS"];

		const embed1 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`You shall get permissions first! (\`${perms}\`)`);

		if (!message.member.hasPermission(perms)) return message.channel.send(embed1);

		const embed2 = new Discord.RichEmbed()
		.setColor(color)
		.setDescription(`I'm sorry but you can't mention someone in your reason.`);

		if(message.mentions.users.size >= 2) return message.channel.send(embed2);

		let member = message.mentions.members.first();
		let reason = args.slice(1).join(' ');
		if (!reason) {
			reason = 'No reason given.'
		}

		const embed3 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`Please mention a valid member in order to be able to kick them.`);

		if (!member) return message.channel.send(embed3);

		const embed4 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`I cannot kick ${member}... Do they have a higher role than me? Do I even have kick permissions?`);

		if (!member.kickable) return message.channel.send(embed4);

		const embed5 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`${message.author} kicked ${member} for: ${reason}`);

		member.kick(`${message.author.tag}: ${reason}`);
		message.channel.send(embed5);
		message.delete();

		//mod log
		let modch = message.guild.channels.find(ch => ch.name === 'reports');
		let modemb = new Discord.RichEmbed()
			.setTitle(`New Mod Log: (${prefix}kick)`)
			.setDescription(`\`\`${message.author.tag}\`\` kicked \`\`${member.user.tag}\`\` for \`\`${reason}\`\``);
		modch.send(modemb);
	},
}