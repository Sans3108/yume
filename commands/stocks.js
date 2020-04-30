const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "stock",
  description: `Check stocks.`,
  aliases: ["stocks"],
  cooldown: 3,
  ownerOnly: true,
  shop: true,
  guildOnly: true,
  execute(message, args, bot, color) {
    
    let stocks = items.map(i => `${i.name} | \`${i.uid}\` | ${db.fetch(i.uid).stock}`)
    
    let emb1 = new Discord.RichEmbed()
      .setColor(color.blue)
      .setDescription(stocks);
    
    message.channel.send(emb1);
    
  }
};