const Discord = require("discord.js");
const { ownerID } = require("../config.json");

module.exports = {
    name: 'approve',
    description: 'DMs \`\`Your track, {track name}, was reviewed and approved!\`\` to someone.',
    usage: '[user ID] [track name]',
    cooldown: 2,
    guildOnly: true,
    args: true,
    execute(message, args, bot, color) {
        const perms = ["ADMINISTRATOR"];

        const embed1 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`You shall get permissions first! (\`${perms}\`)`);

        if (message.channel.type === 'text' && !message.member.hasPermission(perms)) return message.channel.send(embed1);

        const embed2 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`I'm sorry but you can't mention anyone while using this command.`);

        if (message.mentions.users.size >= 1) return message.channel.send(embed2);

        const embed3 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Please provide a user ID.`);

        let member = args[0];
        /*if (message.channel.type === 'dm') {
            member = args[0];
        } else {
            member = message.mentions.members.first();
        }*/

        if (isNaN(member)) return message.channel.send(embed3);

        const embed9 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot DM myself.');

        if (message.channel.type === 'dm') {
            console.log('Command used in DM.')
        } else if (bot.user.id === member) return message.channel.send(embed9);

        let m = args.slice(1).join(' ');

        const embed4 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Please provide a valid track name.');

        if (!m) return message.channel.send(embed4)

        /*const embed5 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('When using this command in DM you need to provide the user\'s ID and you need to make sure the bot is in the same server as the user.\nOne of these conditions was not met in this case.');

        const embed6 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Using this command in DM is only available to the bot owner!');*/

        const embed7 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot dm that user.');

        const embed8 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot find user to dm.');

        /*const embed10 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('Approve command:')
            .setDescription('DM sent!');*/

        const embed11 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`Your track, \`\`${m}\`\`, was reviewed and approved!`);

        bot.fetchUser(member).then(u => {
            u.send(embed11).then(a => message.react('👍')).catch(e => {
                console.log(e);
                message.channel.send(embed7);
            })
        }).catch(e => {
            console.log(e);
            message.channel.send(embed8);
        });

    },
};

/*bot.fetchUser(member.user.id).then(u => {
    u.send(m).then(a => message.author.send(embed10).catch(e => console.log(e))).catch(e => {
        console.log(e);
        message.channel.send(embed7);
    })
    message.delete();
}).catch(e => {
    console.log(e);
    message.channel.send(embed8);
});*/