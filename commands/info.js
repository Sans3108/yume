const Discord = require("discord.js");

module.exports = {
  name: "info",
  description: "Info about you or the mentioned user.",
  usage: "<@user>",
  aliases: ["me"],
  cooldown: 1,
  guildOnly: true,
  execute(message, args, bot, color) {
    let infoUser = message.mentions.members.first();

    if (!args[0]) {
      let embed2 = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL}`
        )
        .setDescription(`<@${message.author.id}>`)
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .addField(`Status:`, `${message.author.presence.status}`, true)
        .addField(`Registered on Discord at:`, `${message.author.createdAt}`)
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp();

      message.channel.send(embed2);
    } else if (args[0] && infoUser) {
      let embed4 = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor(
          `${infoUser.user.tag}`,
          `${infoUser.user.displayAvatarURL}`
        )
        .setDescription(`<@${infoUser.user.id}>`)
        .setThumbnail(`${infoUser.user.displayAvatarURL}`)
        .addField(`Status:`, `${infoUser.user.presence.status}`, true)
        .addField(`Registered on Discord at:`, `${infoUser.user.createdAt}`)
        .setFooter(`ID: ${infoUser.user.id}`)
        .setTimestamp();

      message.channel.send(embed4);
    } else if (!infoUser) {
      let embed3 = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL}`
        )
        .setDescription(`<@${message.author.id}>`)
        .setThumbnail(`${message.author.displayAvatarURL}`)
        .addField(`Status:`, `${message.author.presence.status}`, true)
        .addField(`Registered on Discord at:`, `${message.author.createdAt}`)
        .setFooter(`ID: ${message.author.id}`)
        .setTimestamp();

      message.channel.send(embed3);
    }

    const embed1 = new Discord.RichEmbed()
      .setColor(color)
      .setDescription(
        `I'm sorry but you can't mention more than 1 user when using this command.`
      );

    if (message.mentions.users.size >= 2) return message.channel.send(embed1);
  }
};
