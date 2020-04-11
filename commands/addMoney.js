const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "addmoney",
  description: "Adds money to an user!",
  usage: "[ID] [amount]",
  aliases: ["am"],
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  args: true,
  execute(message, args, bot, color) {
    if (message.guild.member(args[0])) {
      let emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription("Invalid amount!");
      if (isNaN(args[1])) return message.channel.send(emb1);

      try {
        let user = db.fetch(args[0]);
        user.bal = user.bal + parseInt(args[1], 10);
        db.set(args[0], user);

        let emb2 = new Discord.RichEmbed()
          .setColor(color)
          .setDescription(
            `You added ${args[1]}${db.fetch("cfg").currency} to user <@${
              args[0]
            }> ! \nTotal balance: ${db.fetch(args[0]).bal}${
              db.fetch("cfg").currency
            }`
          );
        message.channel.send(emb2);
      } catch {
        let emb3 = new Discord.RichEmbed()
          .setColor(color)
          .setDescription("Member does not have a balanec!");
        message.channel.send(emb3);
      }
    } else {
      let emb4 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription("Member ID is invalid!");

      message.channel.send(emb4);
    }
  }
};
