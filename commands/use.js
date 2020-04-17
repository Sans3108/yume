const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "use",
  description: `Use an item from your inventory!`,
  cooldown: 3,
  usage: "[item name]",
  args: true,
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
    
    let emb1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription('You don\'t have that item, check the shop and buy it first!');
    
    if(f.arrayContains(args.join(' ').toLowerCase(), data.inventory.map(a => a.name.toLowerCase()))) {
      let item = items.find(i => i.name.toLowerCase() === args.join(' ').toLowerCase());
      //params in order: message, bot 
      item.execute(message, bot);
      
      let index = data.inventory.indexOf(item);
      data.inventory.splice(index, 1);
      db.set(message.author.id, data);
      
      return message.react('✅')
      
    } else return message.channel.send(emb1);
  }
};