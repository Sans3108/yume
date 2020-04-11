const Discord = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "work",
  description: "Work and get paid! [1h cooldown]",
  cooldown: 3600,
  ownerOnly: true,
  guildOnly: true,
  execute(message, args, bot, color) {
    try {
      let user = db.fetch(message.author.id)
      user.bal = user.bal + 69;
      db.set(message.author.id, user)
      
      message.channel.send("You worked for 69!\nTotal balance: "+ db.fetch(message.author.id).bal);
      
    } catch {
      db.set(message.author.id, { bal: 0});
      
      let user = db.fetch(message.author.id)
      user.bal = user.bal + 69;
      db.set(message.author.id, user)
      
      message.channel.send("You worked for 69!\nTotal balance: "+ db.fetch(message.author.id).bal);
    }
  }
};
