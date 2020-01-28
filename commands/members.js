const Discord = require("discord.js");

module.exports = {
  name: "members",
  description: "Info about the server members.",
  cooldown: 3,
  guildOnly: true,
  execute(message, args, bot, color) {
    const embed1 = new Discord.RichEmbed()
      .setColor(color)
      .setTitle("Members info:")
      .setDescription(
        `Humans: **${
          message.guild.members.filter(m => !m.user.bot).size
        }** ->\n - **${
          message.guild.members
            .filter(m => !m.user.bot)
            .filter(m => m.presence.status === "online").size
        }** online\n- **${
          message.guild.members
            .filter(m => !m.user.bot)
            .filter(m => m.presence.status === "idle").size
        }** idle\n- **${
          message.guild.members
            .filter(m => !m.user.bot)
            .filter(m => m.presence.status === "dnd").size
        }** dnd (Do not Disturb)\n- **${
          message.guild.members
            .filter(m => !m.user.bot)
            .filter(m => m.presence.status === "offline").size
        }** offline\nBots: **${
          message.guild.members.filter(m => m.user.bot).size
        }**\nTotal members: **${message.guild.members.size}**`
      );

    message.channel.send(embed1);
  }
};
