function clean(text) {
	if (typeof (text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
};

const Discord = require("discord.js");

module.exports = {
	name: 'eval',
	//description: '',	
	//usage: '[text]',
	ownerOnly: true,
	cooldown: 0.5,
	execute(message, args, bot, color) {

		try {
			let code = args.join(" ");
			if (code.startsWith('```js') && code.endsWith('```')) {
				code = code.slice(5, -3);
			}

			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);

			message.channel.send(clean(evaled), { code: "xl" });

		} catch (err) {
			console.log(err);
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);

		}
	},
};