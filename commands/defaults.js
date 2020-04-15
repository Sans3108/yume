const Discord = require("discord.js");
const db = require('quick.db');
const { default_currency, gain_rate, loss_rate } = require('../cfg.json');

module.exports = {
  name: "defaults",
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  execute(message, args, bot, color) {
    db.delete('cfg');
    db.set('cfg', { currency: default_currency });
    
    let a = new Discord.RichEmbed()
      .setColor(color.green)
      .setDescription('Done.');
    
    message.channel.send(a);
  }
};