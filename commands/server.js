const Discord = require("discord.js");

module.exports = {
	name: 'server',
	description: 'Info about the server.',
	aliases: ['sv', 'guild', 'server-info'],
	cooldown: 3,
	guildOnly: true,
	execute(message, args, bot, color) {

		let afk = message.guild.afkChannel
		if(!afk) {
			afk = 'No AFK channel.'
		}

		const embed1 = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(`Server info (${message.guild.name})`)
		.setThumbnail(`${message.guild.iconURL}`)
		.addField(`Server name:`, `${message.guild.name}`)
		.addField(`Server ID:`, `${message.guild.id}`)
		.addField(`Server Owner:`, `${message.guild.owner.user.tag}`)
		.addField(`Creation date:`, `${message.guild.createdAt}`)
		.addField(`Members info:`, `Humans: **${message.guild.members.filter(m => !m.user.bot).size}** ->\n - **${message.guild.members.filter(m => !m.user.bot).filter(m => m.presence.status === 'online').size}** online\n- **${message.guild.members.filter(m => !m.user.bot).filter(m => m.presence.status === 'idle').size}** idle\n- **${message.guild.members.filter(m => !m.user.bot).filter(m => m.presence.status === 'dnd').size}** dnd (Do not Disturb)\n- **${message.guild.members.filter(m => !m.user.bot).filter(m => m.presence.status === 'offline').size}** offline\nBots: **${message.guild.members.filter(m => m.user.bot).size}**\nTotal members: **${message.guild.members.size}**`)
		.addField(`Region:`, `${message.guild.region}`)
		.addField(`AFK timeout:`, `${message.guild.afkTimeout} seconds`)
		.addField(`AFK channel:`, `${afk}`)
		.addField(`Verification level:`, `${message.guild.verificationLevel}`);
		
		message.channel.send(embed1);
	},
};