const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  description: "¯\\_(ツ)_/¯",
  aliases: ["up-time"],
  cooldown: 3,
  execute(message, args, bot, color) {
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let uptime = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Bot uptime:")
      .setDescription(
        `${days} day/s\n${hours} hour/s\n${minutes} minute/s\n${seconds} second/s`
      );

    message.channel.send(uptime);
  }
};
