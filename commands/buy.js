const Discord = require("discord.js");
const db = require("quick.db");
const items = require('../items.js');
const { prefix } = require('../prefix.json');
const f = require('../functions.js');

module.exports = {
  name: "buy",
  description: `Buy an item with your credit!`,
  usage: "[item name]",
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
    
    if(f.arrayContains(args.join(' ').toLowerCase(), items.map(a => a.name.toLowerCase()))) {
      let item = items.find(i => i.name.toLowerCase() === args.join(' ').toLowerCase());
      
      //-----------------------------------------------------------------------------------
      let check = db.fetch('responses');
      let it = check.find(i => i.id === message.author.id) || null;
      //let it2 = check.find(i => i.name.toLowerCase() === 'Custom Response'.toLowerCase());
      
      let customEmb = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`You already have a custom response set!\nTo edit it use the \`${prefix}edit\` command!`);
      
      let customEmb2 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`You already have a custom response in your inventory!\nTo use it use the \`${prefix}use\` command!`);
      
      if(item.name === 'Custom Response' && it !== null) return message.channel.send(customEmb);
      if(f.arrayContains('Custom Response'.toLowerCase(), data.inventory.map(a => a.name.toLowerCase()))) return message.channel.send(customEmb2);
      //-----------------------------------------------------------------------------------
      
      let emb4 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`I'm sorry, that item is no longer in stock. Check back another time!`);
      if(db.fetch(item.uid).stock === 'Inf.') {
        
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
      } else if (db.fetch(item.uid).stock > 0) {
        let emb5 = new Discord.RichEmbed()
          .setColor(color.red)
          .setDescription(`You need ${item.price - data.bal}${db.fetch('cfg').currency} more to buy \`${item.name}\`!`);
      
        if(data.bal >= item.price) {
          let stk = db.fetch(item.uid);
          stk.stock = stk.stock - 1;
          db.set(item.uid, stk);
          
          data.inventory.push(item);
          data.bal = data.bal - item.price;
        
          db.set(message.author.id, data);
        
          let emb6 = new Discord.RichEmbed()
            .setColor(color.green)
            .setDescription(`You bought \`${item.name}\` for ${item.price}${db.fetch('cfg').currency}! Check your inventory!`);
          return message.channel.send(emb6);
        } else return message.channel.send(emb5);
      } else return message.channel.send(emb4);
    } else return message.channel.send(emb1);
  }
};