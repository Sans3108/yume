const Discord = require("discord.js");

module.exports = {	
	name: 'shrug',	
	description: '¯\\_(ツ)_/¯',	
	//usage: '[text]',	
	cooldown: 0.5,	
execute(message, args, bot, color) {
		message.delete();
		message.channel.send('¯\\_(ツ)_/¯');
	},
};