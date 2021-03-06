const Discord = require("discord.js");
const db = require("quick.db");
const f = require('../functions.js');

module.exports = {
  name: "daily",
  description: "Daily credit! [1 - 50/d]",
  cooldown: 86400,
  guildOnly: true,
  shop: true,
  execute(message, args, bot, color) {
    try {
      let user = db.fetch(message.author.id);
      
      let rand = Math.floor(f.randomNumber(1, 50));
    
      user.bal = user.bal + rand;
      db.set(message.author.id, user);
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You collected ${rand}${db.fetch("cfg").currency}\nTotal balance: ${db.fetch(message.author.id).bal}${db.fetch("cfg").currency}`)

      message.channel.send(emb1);
    } catch {
      db.set(message.author.id, { bal: 0, joinedAt: Date(Date.now()).slice(4, -47) });
      let user = db.fetch(message.author.id);
      
      let rand = Math.floor(f.randomNumber(1, 50));
    
      user.bal = user.bal + rand;
      db.set(message.author.id, user);
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You collected ${rand}${db.fetch("cfg").currency}\nTotal balance: ${db.fetch(message.author.id).bal}${db.fetch("cfg").currency}`)

      message.channel.send(emb2);
    }
  }
};
