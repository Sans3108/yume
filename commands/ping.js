const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "PONG!",
  cooldown: 2,
  execute(message, args, bot, color) {
    const embed1 = new Discord.RichEmbed()
      .setColor(color.blue)
      .setDescription("Pinging...");

    message.channel.send(embed1).then(sent => {
      const embed1Edit = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(
          `Pong! :ping_pong:\n\n:person_running: Ping: ${sent.createdTimestamp -
            message.createdTimestamp}ms\n:clock4: Response Time: ${Math.floor(
            bot.ping
          )}ms`
        );

      sent.edit(embed1Edit);
    });
  }
};
