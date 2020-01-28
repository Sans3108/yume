const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "PONG!",
  cooldown: 2,
  execute(message, args, bot, color) {
    const embed1 = new Discord.RichEmbed()
      .setColor(color)
      .setDescription("Pinging...");

    message.channel.send(embed1).then(sent => {
      const embed1Edit = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `Pong! :ping_pong:\n\n:person_running: Response time: ${sent.createdTimestamp - message.createdTimestamp}ms\n:clock4: Ping: ${bot.ping}ms`
        );

      sent.edit(embed1Edit);
    });
  }
};
