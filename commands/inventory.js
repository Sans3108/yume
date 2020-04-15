const Discord = require("discord.js");
const db = require("quick.db");
const { prefix } = require('../prefix.json');

module.exports = {
  name: "inventory",
  description: `Check your inventory!`,
  cooldown: 3,
  aliases: ["inv"],
  guildOnly: true,
  execute(message, args, bot, color) {
    if (db.fetch(message.author.id) === null) {
      db.set(message.author.id, {
        bal: 0,
        joinedAt: Date(Date.now()).slice(4, -47),
        inventory: []
      });
    }

    let data = db.fetch(message.author.id);
    
    let inv;
    if(data.inventory[0]) {
      inv = data.inventory.map(a => a.name).join(', ');
    } else {
      inv = '_<empty>_';
    }
    
    let emb1 = new Discord.RichEmbed()
      .setColor(color.blue)
      .setAuthor(message.member.displayName, message.author.displayAvatarURL, message.author.displayAvatarURL)
      .setThumbnail(message.author.displayAvatarURL)
      .setTitle(`__Your inventory:__`)
      .setDescription(`${inv}`)
      .setFooter(`Use '${prefix}use' to use an item!`);
    message.channel.send(emb1);
  }
};