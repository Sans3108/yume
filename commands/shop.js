const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "shop",
  description: `Check what items are in store!`,
  cooldown: 3,
  usage: "<item name>",
  guildOnly: true,
  shop: true,
  execute(message, args, bot, color) {
    if (db.fetch(message.author.id) === null) {
      db.set(message.author.id, {
        bal: 0,
        joinedAt: Date(Date.now()).slice(4, -47),
        inventory: []
      });
    }
    
    if(!args.length) {
     let shop = items.sort((a, b) => a.price < b.price).map(a => `\`${a.name}\` - ${a.price}${db.fetch('cfg').currency} | (Stock: ${db.fetch(a.uid).stock})`)       //.join("\n");
    
      let emb1 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle('__Welcome to the shop!__')
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(shop)
        .setFooter(`Use '${prefix}shop <item name>' to see more info about an item!\nUse '${prefix}buy' to buy an item!`);
      return message.channel.send(emb1); 
    }
    
    let shop2 = items.map(a => a.name.toLowerCase());
    
    let emb3 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`\`${args.join(' ')}\` doesn't exist in the shop!`);
    if(f.arrayContains(args.join(' ').toLowerCase(), shop2)) {
      let item = items.find(i => i.name.toLowerCase() === args.join(' ').toLowerCase());
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setTitle('Item info:')
        .setThumbnail(message.author.displayAvatarURL)
        .addField('Name:', item.name)
        .addField('Price:', item.price + db.fetch('cfg').currency)
        .addField('In Stock:', db.fetch(item.uid).stock)
        .addField('Description:', item.description)
        .setFooter(`Use '${prefix}buy' to buy an item!`);
      return message.channel.send(emb2);
      
    } else return message.channel.send(emb3);
  }
};