const Discord = require("discord.js");
const db = require('quick.db');
const { prefix } = require('../prefix.json');

module.exports = {
  name: "balance",
  description: "Check your balance!",
  aliases: ['bal'],
  cooldown: 3,
  guildOnly: true,
  shop: true,
  execute(message, args, bot, color) {
    try {
      let user = db.fetch(message.author.id)
      let emb1 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL, message.author.displayAvatarURL)
        .setDescription(`You have ${user.bal}${db.fetch('cfg').currency}`);
        //.setFooter(`You can use the '${prefix}pay' command to pay someone!`);
      message.channel.send(emb1);
      
    } catch {
      db.set(message.author.id, { bal: 0, joinedAt: Date(Date.now()).slice(4, -47), inventory: [] });
      
      let user = db.fetch(message.author.id)
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setAuthor(message.member.displayName, message.author.displayAvatarURL, message.author.displayAvatarURL)
        .setDescription(`You have ${user.bal}${db.fetch('cfg').currency}`);
        //.setFooter(`You can use the '${prefix}pay' command to pay someone!`);
      message.channel.send(emb2);
    }
  }
};