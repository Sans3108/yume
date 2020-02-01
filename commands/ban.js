const Discord = require("discord.js");

module.exports = {
	name: 'ban',
	description: 'Ban a member from the server with a optional reason.',
	usage: '[@member] <reason>',
	cooldown: 5,
	guildOnly: true,
	args: true,
  staff: true,
	execute(message, args, bot, color) {
		const perms = ["BAN_MEMBERS"];

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
			.setDescription(`Please mention a valid member in order to be able to ban them.`);

		if (!member) return message.channel.send(embed3);

		const embed4 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`I cannot ban ${member}... Do they have a higher role than me? Do I even have kick permissions?`);

		if (!member.bannable) return message.channel.send(embed4);

		const embed5 = new Discord.RichEmbed()
			.setColor(color)
			.setDescription(`${message.author} banned ${member} for: ${reason}`);

		member.ban(`${message.author.tag}: ${reason}`);
		message.channel.send(embed5);
		message.delete();
	},
}