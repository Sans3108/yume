const Discord = require("discord.js");

module.exports = {
	name: 'info',
	description: 'Info about you or the mentioned user.',
	usage: '<@user>',
	aliases: ['me'],
	cooldown: 1,
	guildOnly: true,
	execute(message, args, bot, color) {

		if (!args[0]) {
			const embed1 = new Discord.RichEmbed()
				.setColor(color) //no args
				.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
				.setDescription(`<@${message.author.id}>`)
				.setThumbnail(`${message.author.displayAvatarURL}`)
				.addField(`Status:`, `${message.author.presence.status}`, true)
				.addField(`Registered on Discord at:`, `${message.author.createdAt}`)
				.setFooter(`ID: ${message.author.id}`)
				.setTimestamp();

			message.channel.send(embed1);
		} else {
			try {
				function getUserIDFromMention(mention) {
					if (!mention) return;

					if (mention.startsWith('<@') && mention.endsWith('>')) {
						mention = mention.slice(2, -1);

						if (mention.startsWith('!')) {
							mention = mention.slice(1);
						}

						return mention;
					}
				}

				var obj = {
					getMemberFromMention: function (mention) {
						if (!mention) return;

						if (mention.startsWith('<@') && mention.endsWith('>')) {
							mention = mention.slice(2, -1);

							if (mention.startsWith('!')) {
								mention = mention.slice(1);
							}

							return message.guild.fetchMember(mention);
						}
					},
					getUserFromMention: function (mention) {
						if (!mention) return;

						if (mention.startsWith('<@') && mention.endsWith('>')) {
							mention = mention.slice(2, -1);

							if (mention.startsWith('!')) {
								mention = mention.slice(1);
							}

							return bot.users.get(mention);
						}
					}
				}

				let mem = obj.getUserFromMention(args[0]);
				bot.fetchUser(getUserIDFromMention(args[0])).then(u => {
					if (!u.bot) {

						try {
							const embed2 = new Discord.RichEmbed()
								.setColor(color) //args 0 not a bot
								.setAuthor(`${mem.tag}`, `${mem.displayAvatarURL}`)
								.setDescription(`<@${mem.id}>`)
								.setThumbnail(`${mem.displayAvatarURL}`)
								.addField(`Status:`, `${u.presence.status}`, true)
								.addField(`Registered on Discord at:`, `${message.author.createdAt}`)
								.setFooter(`ID: ${message.author.id}`)
								.setTimestamp();

							message.channel.send(embed2);
						} catch (e) {
							console.log(e);

							const embed5 = new Discord.RichEmbed()
								.setColor(color) //unknown mention
								.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
								.setDescription(`<@${message.author.id}>`)
								.setThumbnail(`${message.author.displayAvatarURL}`)
								.addField(`Status:`, `${message.author.presence.status}`, true)
								.addField(`Registered on Discord at:`, `${message.author.createdAt}`)
								.setFooter(`ID: ${message.author.id}`)
								.setTimestamp();

							message.channel.send(embed5);
						}

					} else {
						const embed4 = new Discord.RichEmbed()
							.setColor(color) //args 0 is a bot
							.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
							.setDescription(`<@${message.author.id}>`)
							.setThumbnail(`${message.author.displayAvatarURL}`)
							.addField(`Status:`, `${message.author.presence.status}`, true)
							.addField(`Registered on Discord at:`, `${message.author.createdAt}`)
							.setFooter(`ID: ${message.author.id}`)
							.setTimestamp();

						message.channel.send(embed4);
					}
				});

			} catch (e) {
				console.log(e);

				const embed3 = new Discord.RichEmbed()
					.setColor(color) //any spelling error
					.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
					.setDescription(`<@${message.author.id}>`)
					.setThumbnail(`${message.author.displayAvatarURL}`)
					.addField(`Status:`, `${message.author.presence.status}`, true)
					.addField(`Registered on Discord at:`, `${message.author.createdAt}`)
					.setFooter(`ID: ${message.author.id}`)
					.setTimestamp();

				message.channel.send(embed3);
			}

		}
	},
};