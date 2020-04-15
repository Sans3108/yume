const Discord = require("discord.js");
const { prefix } = require("../prefix.json");

module.exports = {
  name: "unban",
  description: "Unban a user by their ID.",
  usage: "[user ID]",
  cooldown: 5,
  guildOnly: true,
  args: true,
  staff: true,
  execute(message, args, bot, color) {
    const perms = ["BAN_MEMBERS"];

    const embed1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`You shall get permissions first! (\`${perms}\`)`);

    if (!message.member.hasPermission(perms))
      return message.channel.send(embed1);

    let embed2 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`The ID: _${args[0]}_ is invalid.`);

    let embed4 = new Discord.RichEmbed()
      .setColor(color.blue)
      .setDescription("Could not unban user.");

    bot
      .fetchUser(args[0])
      .then(bannedMember => {
        let embed3 = new Discord.RichEmbed()
          .setColor(color.green)
          .setDescription(
            `${bannedMember.tag} has been unbanned by ${message.author}`
          );

        message.guild
          .fetchBans()
          .then(banList => {
            let bannedUser = banList.find(user => user.id === bannedMember.id);

            if (bannedUser) {
              message.guild
                .unban(bannedMember)
                .then(message.channel.send(embed3));

              //mod log
              let modch = message.guild.channels.find(
                ch => ch.name === "reports"
              );
              let modemb = new Discord.RichEmbed()
                .setTitle(`New Mod Log: (${prefix}unban)`)
                .setDescription(
                  `\`\`${message.author.tag}\`\` unbanned \`\`${bannedMember.tag}\`\`.`
                );
              modch.send(modemb);
            } else {
              message.channel.send(embed4);
            }
          })
          .catch(e => message.channel.send(e.message));
      })
      .catch(e => {
        message.channel.send(embed2);
        //message.channel.send(e);
      });
  }
};
