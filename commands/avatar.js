const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Info about you or the mentioned user.",
  usage: "<@user>",
  aliases: ["pfp"],
  cooldown: 1,
  guildOnly: true,
  execute(message, args, bot, color) {
    let infoUser = message.mentions.members.first();

    const embed1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(
        `I'm sorry but you can't mention more than 1 user when using this command.`
      );

    if (message.mentions.users.size >= 2) return message.channel.send(embed1);

    if (!args[0]) {
      let embed2 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle(`${message.member.displayName}'s profile picture:`)
        .setDescription(`Link: ${message.author.displayAvatarURL}`)
        .setImage(message.author.displayAvatarURL);

      message.channel.send(embed2);
    } else if (args[0] && infoUser) {
      let embed4 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle(`${infoUser.displayName}'s profile picture:`)
        .setDescription(infoUser.user.displayAvatarURL)
        .setImage(infoUser.user.displayAvatarURL);

      message.channel.send(embed4);
    } else if (!infoUser) {
      let embed3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle(`${message.member.displayName}'s profile picture:`)
        .setDescription(`Link: ${message.author.displayAvatarURL}`)
        .setImage(message.author.displayAvatarURL);

      message.channel.send(embed3);
    }
  }
};
