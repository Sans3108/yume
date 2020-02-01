const Discord = require("discord.js");
const { prefix } = require("../prefix.json");

module.exports = {
    name: 'nick',
    description: 'Change someone\'s nickname on this server!',
    aliases: ['nickname'],
    usage: '[@user] [new nickname/ reset]',
    cooldown: 5,
    guildOnly: true,
    args: true,
    staff: true,
    execute(message, args, bot, color) {

        const perms = ["MANAGE_NICKNAMES"];

        const embed1 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`You shall get permissions first! (\`${perms}\`)`);

        if (!message.member.hasPermission(perms)) return message.channel.send(embed1);

        let member = message.mentions.members.first();
        let newNick = args.slice(1).join(' ');

        let embed7 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Please provide the new nickname for ${member}.`)

        if (!newNick) return message.channel.send(embed7);

        let resetNick = 'reset';

        const embed5 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Please mention a valid member in order to change their nickname!`);

        const embed6 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`If you wish to change my nickname use the \`\`${prefix}bot-nick\`\` command.`)

        if (!member) return message.channel.send(embed5);
        if (member.user.id === bot.user.id) return message.channel.send(embed6)

        const embed2 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(`${member.user.tag}'s nickname was set to:`)
            .setDescription(`${newNick}`);

        const embed3 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle(`${member.user.tag}'s nickname was cleared!`);

        const embed4 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`${member.user.tag}'s nickname can\'t contain more than 32 characters!\n(Including spaces or other non-alpha-numetrical characters!)`);

        if (newNick.length > 32) {
            message.channel.send(embed4);
        } else if (args[1].toLowerCase() === resetNick) {
            member.setNickname('');

            message.channel.send(embed3);

            //mod log
            let modch2 = message.guild.channels.find(ch => ch.name === 'reports');
            let modemb2 = new Discord.RichEmbed()
                .setTitle(`New Mod Log: (${prefix}nick)`)
                .setDescription(`\`\`${message.author.tag}\`\` cleared \`\`${member.user.tag}\`\`'s nickname.`);
            modch2.send(modemb2);
        } else {
            member.setNickname(`${newNick}`);

            message.channel.send(embed2);

            //mod log
            let modch1 = message.guild.channels.find(ch => ch.name === 'reports');
            let modemb1 = new Discord.RichEmbed()
                .setTitle(`New Mod Log: (${prefix}nick)`)
                .setDescription(`\`\`${message.author.tag}\`\` changed \`\`${member.user.tag}\`\`'s nickname to \`\`${newNick}\`\``);
            modch1.send(modemb1);
        }

    },
};