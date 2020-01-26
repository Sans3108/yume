const Discord = require("discord.js");

module.exports = {
	name: 'lenny',
	description: '( ͡° ͜ʖ ͡°)',
	//usage: '[text]',	
	cooldown: 0.5,
	execute(message, args, bot, color) {
		message.delete();

		let array = ['( ͡° ͜ʖ ͡°)', '(☭ ͜ʖ ☭)', '(☭ ͜ʖ ☭)', '(ᴗ ͜ʖ ᴗ)', '( ° ͜ʖ °)', '(° ͜ʖ °)', '(⟃ ͜ʖ ⟄)', '( ‾ ʖ̫ ‾)', '(͠≖ ͜ʖ͠≖)', '( ͡° ʖ̯ ͡°)', 'ʕ ͡° ʖ̯ ͡°ʔ', '( ͡° ل͜ ͡°)', '( ͠° ͟ʖ ͡°)', '( ͠° ͟ʖ ͠°)', '( ͡~ ͜ʖ ͡°)', '( ͡o ͜ʖ ͡o)', '( ͡◉ ͜ʖ ͡◉)', '( ͡☉ ͜ʖ ͡☉)', '( ͡° ͜V ͡°)', 'ʕ ͡° ͜ʖ ͡°ʔ', '( ͡ᵔ ͜ʖ ͡ᵔ )', '( ͡° ͜ʖ ͡ °)', '( ͡ʘ ͜ʖ ͡ʘ)'];
		let rand = array[Math.floor(Math.random() * array.length)];

		message.channel.send(rand);
	},
};