const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "buy",
  description: `Buy an item with your credit!`,
  cooldown: 3,
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
      .setDescription('That item doesn\'t exist in the shop!');
    
    if(f.arrayContains(args.join(' '), items.map(a => a.name))) {
      let item = items.find(i => i.name === args.join(' '));
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`You need ${item.price - data.bal}${db.fetch('cfg').currency} more to buy \`${item.name}\`!`);
      
      if(data.bal >= item.price) {
        data.inventory.push(item);
        data.bal = data.bal - item.price;
        
        db.set(message.author.id, data);
        
        let emb3 = new Discord.RichEmbed()
          .setColor(color.green)
          .setDescription(`You bought \`${item.name}\` for ${item.price}${db.fetch('cfg').currency}! Check your inventory!`);
        return message.channel.send(emb3);
      } else return message.channel.send(emb2);
    } else return message.channel.send(emb1);
  }
};