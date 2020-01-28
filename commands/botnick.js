const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
    name: 'bot-nick',
    description: 'Change my nickname on this server!',
    aliases: ['bot-nickname'],
    usage: '[new nickname/ reset]',
    cooldown: 5,
    guildOnly: true,
    args: true,
    execute(message, args, bot, color) {

        const perms = ["MANAGE_NICKNAMES"];

        const embed1 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`You shall get permissions first! (\`${perms}\`)`);

        if (!message.member.hasPermission(perms)) return message.channel.send(embed1);

        let newNick = args.join(' ');
        let embed5 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('Please provide the new nickname for the bot.')

        if (!newNick) return message.channel.send(embed5);
        let resetNick = 'reset';

        const embed2 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('My nickname was set to:')
            .setDescription(`${newNick}`);

        const embed3 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('My nickname was cleared!');

        const embed4 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('My new nickname can\'t contain more than 32 characters!\n(Including spaces or other non-alpha-numetrical characters!)');

        if (newNick.length > 32) {
            message.channel.send(embed4);
        } else if (args[0].toLowerCase() === resetNick) {
            message.guild.me.setNickname('');

            message.channel.send(embed3);

            //mod log
            let modch2 = message.guild.channels.find(ch => ch.name === 'reports');
            let modemb2 = new Discord.RichEmbed()
                .setTitle(`New Mod Log: (${prefix}nick)`)
                .setDescription(`\`\`${message.author.tag}\`\` cleared my nickname.`);
            modch2.send(modemb2);
        } else {
            message.guild.me.setNickname(`${newNick}`);

            message.channel.send(embed2);

            //mod log
            let modch1 = message.guild.channels.find(ch => ch.name === 'reports');
            let modemb1 = new Discord.RichEmbed()
                .setTitle(`New Mod Log: (${prefix}nick)`)
                .setDescription(`\`\`${message.author.tag}\`\` changed my nickname to \`\`${newNick}\`\``);
            modch1.send(modemb1);
        }

    },
};