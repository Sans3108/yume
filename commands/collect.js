const Discord = require("discord.js");
const db = require("quick.db");
const f = require('../functions.js');

module.exports = {
  name: "collect",
  description: "Collect some credit! [3 - 25/h]",
  aliases: ['work'],
  cooldown: 3600,
  shop: true,
  guildOnly: true,
  execute(message, args, bot, color) {
    try {
      let user = db.fetch(message.author.id);
      
      let r1 = f.randomNumber(3, 25);
      let r2 = f.randomNumber(3, 25);
      let r3 = f.randomNumber(3, 25);
      let r4 = f.randomNumber(3, 25);
      
      let rand1 = Math.floor(( r1 + r2 ) / 2);
      let rand2 = Math.floor(( r3 + r4 ) / 2);
      
      let rand = Math.floor((rand1 + rand2) / 2);
    
      user.bal = user.bal + rand;
      db.set(message.author.id, user);
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You collected ${rand}${db.fetch("cfg").currency}\nTotal balance: ${db.fetch(message.author.id).bal}${db.fetch("cfg").currency}`)

      message.channel.send(emb1);
    } catch {
      db.set(message.author.id, { bal: 0, joinedAt: Date(Date.now()).slice(4, -47) });
      let user = db.fetch(message.author.id);
      
      let r1 = f.randomNumber(3, 25);
      let r2 = f.randomNumber(3, 25);
      let r3 = f.randomNumber(3, 25);
      let r4 = f.randomNumber(3, 25);
      
      let rand1 = Math.floor(( r1 + r2 ) / 2);
      let rand2 = Math.floor(( r3 + r4 ) / 2);
      
      let rand = Math.floor((rand1 + rand2) / 2);
    
      user.bal = user.bal + rand;
      db.set(message.author.id, user);
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You collected ${rand}${db.fetch("cfg").currency}\nTotal balance: ${db.fetch(message.author.id).bal}${db.fetch("cfg").currency}`)

      message.channel.send(emb2);
    }
  }
};
