const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "setcurrency",
  description: "Changes the currency!",
  aliases: ['set-currency', 'sc', 'currency'],
  cooldown: 3,
  ownerOnly: true,
  args: true,
  guildOnly: true,
  execute(message, args, bot, color) {
    try {
      let cur = db.fetch('cfg');
      cur.currency = args[0];
      db.set('cfg', cur);
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`Succesfully changed the currency of the bot to: \`${db.fetch('cfg').currency}\``);
      message.channel.send(emb1);
      
    } catch {
      db.set('cfg', { currency: '$' });
      
      let cur = db.fetch('cfg');
      cur.currency = args[0];
      db.set('cfg', cur);
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`Succesfully changed the currency of the bot to: \`${db.fetch('cfg').currency}\``);
      message.channel.send(emb1);
    }
  }
};