const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "removestock",
  description: `Check stocks.`,
  aliases: ["removestocks", "remove-stock", "remove-stocks", "rs"],
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  shop: true,
  execute(message, args, bot, color) {

    let emb1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`Invalid item uid!`);
    
    if(db.fetch(args[0]) === null) return message.channel.send(emb1)
    
    let emb2 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription("Invalid amount!");
    
    let v;
    if(parseInt(args[1]) > 0) {
      v = false;
    } else {
      v = true;
    }
    if(v) return message.channel.send(emb2);
    
    let emb3 = new Discord.RichEmbed()
      .setColor(color.green)
      .setDescription(`Done.`);
    
    let a = db.fetch(args[0])
    a.stock = a.stock - parseInt(args[1])
    db.set(args[0], a);
    
    message.channel.send(emb3);
  }
};