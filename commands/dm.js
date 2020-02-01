const Discord = require("discord.js");
const { ownerID } = require("../config.json");

module.exports = {
    name: 'dm',
    description: 'Make me DM someone!',
    aliases: ['pm'],
    usage: '[@user/user ID] [message]',
    cooldown: 2,
    args: true,
    staff: true,
    execute(message, args, bot, color) {
        const perms = ["ADMINISTRATOR"];

        const embed1 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`You shall get permissions first! (\`${perms}\`)`);

        if (message.channel.type === 'text' && !message.member.hasPermission(perms)) return message.channel.send(embed1);

        const embed2 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`I'm sorry but you can't mention more than 1 user when using this command.`);

        if (message.mentions.users.size >= 2) return message.channel.send(embed2);

        const embed3 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Please mention a valid member.`);

        let member;
        if (message.channel.type === 'dm') {
            member = args[0];
        } else {
            member = message.mentions.members.first();
        }

        if (!member) return message.channel.send(embed3);

        const embed9 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot DM myself.');

        if (message.channel.type === 'dm') {
            console.log('Command used in DM.')
        } else if (bot.user.id === member.user.id) return message.channel.send(embed9);

        let m = args.slice(1).join(' ');

        const embed4 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Please provide a valid message in order to send it.');

        if (!m) return message.channel.send(embed4)

        const embed5 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('When using this command in DM you need to provide the user\'s ID and you need to make sure the bot is in the same server as the user.\nOne of these conditions was not met in this case.');

        const embed6 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Using this command in DM is only available to the bot owner!');

        const embed7 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot dm that user.');

        const embed8 = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('Cannot find user to dm.');

        const embed10 = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('DM command:')
            .setDescription('DM sent!');

        if (message.channel.type === 'dm') {
            if (message.author.id === ownerID) {
                bot.fetchUser(member).then(u => {
                    u.send(m).then(a => message.author.send(embed10).catch(e => console.log(e))).catch(e => {
                        console.log(e);
                        message.channel.send(embed7);
                    })
                }).catch(e => {
                    console.log(e);
                    message.channel.send(embed5);
                });
            } else {
                message.channel.send(embed6);
            }
        } else {
            bot.fetchUser(member.user.id).then(u => {
                u.send(m).then(a => message.author.send(embed10).catch(e => console.log(e))).catch(e => {
                    console.log(e);
                    message.channel.send(embed7);
                })
                message.delete();
            }).catch(e => {
                console.log(e);
                message.channel.send(embed8);
            });
        }
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