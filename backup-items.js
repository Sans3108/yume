const Discord = require('discord.js');
let color = require('./colors.json');
const { prefix } = require('./prefix.json');
const isHexcolor = require('is-hexcolor');
const items = require('./items.js');
const db = require("quick.db");

module.exports = [
  {
    name: "Active Role",
    price: 750,
    uid: 'i1',
    description: "Buy this role and show that you are active in our community!",
    execute: function(a) {
      if (!a) return new Error("No message object provided!");

      a.member.addRole(a.guild.roles.find(r => r.id === '699674952151990394'));
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription('You now have the Active role!');
      a.channel.send(emb1);
    }
  },
  {
    name: "Neko Role",
    price: 200,
    uid: 'i2',
    description: "Wanna be a neko?",
    execute: function(a) {
      if (!a) return new Error("No message object provided!");

      a.member.addRole(a.guild.roles.find(r => r.id === '674654526015406150'));
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription('You now have the Neko role!');
      a.channel.send(emb2);
    }
  },
  {
    name: "1500 Kakera",
    price: 100,
    uid: 'i3',
    description: "Buy Kakera for the Mudamaid bot! (You will have to wait until an admin sees the order after buying this item.)",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought 1500 Kakera!\nUse this command to fulfill their order: \`$givescrap ${a.author} 1500\``);
      
      channel.send('<@&479704157729849348>', { embed: emb3 });
    }
  },
  {
    name: "3000 Kakera",
    price: 200,
    uid: 'i4',
    description: "Buy Kakera for the Mudamaid bot! (You will have to wait until an admin sees the order after buying this item.)\nWith this purchase you get 5% more kakera!",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought 3150 Kakera!\nUse this command to fulfill their order: \`$givescrap ${a.author} 3150\``);
      
      channel.send('<@&479704157729849348>', { embed: emb3 });
    }
  },
  {
    name: "5250 Kakera",
    price: 350,
    uid: 'i5',
    description: "Buy Kakera for the Mudamaid bot! (You will have to wait until an admin sees the order after buying this item.)\nWith this purchase you get 15% more kakera!",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought 6030 Kakera!\nUse this command to fulfill their order: \`$givescrap ${a.author} 6030\``);
      
      channel.send('<@&479704157729849348>', { embed: emb3 });
    }
  },
  {
    name: "7500 Kakera",
    price: 500,
    uid: 'i6',
    description: "Buy Kakera for the Mudamaid bot! (You will have to wait until an admin sees the order after buying this item.)\nWith this purchase you get 25% more kakera!",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought 9370 Kakera!\nUse this command to fulfill their order: \`$givescrap ${a.author} 9370\``);
      
      channel.send('<@&479704157729849348>', { embed: emb3 });
    }
  },
  {
    name: "10000 Kakera",
    price: 850,
    uid: 'i9',
    description: "Buy Kakera for the Mudamaid bot! (You will have to wait until an admin sees the order after buying this item.)\nWith this purchase you get 35% more kakera!",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought 13500 Kakera!\nUse this command to fulfill their order: \`$givescrap ${a.author} 13500\``);
      
      channel.send('<.@&479704157729849348>', { embed: emb3 });
    }
  },
  {
    name: "Discord Nitro Classic",
    price: 1500,
    uid: 'i7',
    description: "Buy yourself Discord Nitro Classic gift for 1 month! Sponsored by <@143160118090006530>!\n(After you buy this item you will be contacted asap by Croma or Sans to receive the nitro gift.)",
    execute: function(a, b) {
      if (!a) return new Error("No message object provided!");
      if (!b) return new Error("No bot object provided!");
      
      let channel = b.channels.find(ch => ch.id === '605067577688981546');
      let emb3 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`User with ID: ${a.author.id}\nTag: ${a.author.tag}\nHas bought Discord Nitro!`);
      
      channel.send('<@143160118090006530> & <@366536353418182657>', { embed: emb3 });
    }
  },
  {
    name: "Custom Response",
    price: 300,
    uid: 'i8',
    description: 'Get yourself a custom response! (The bot will reply with it to anyone who tags you)',
    execute: function(a, b) {
      
      
      const filter = m => m.author.id === a.author.id;
      
      let emb1 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setDescription(`${a.author} What should the bot reply with?\n(Your next message will be recorded and used)`);
      
      a.channel.send(emb1);
      
      a.channel.awaitMessages(filter, {max: 1, time: 15000}).then(collected => {
        
        let t;
        try {
          t = collected.first().content;
        } catch {
          let emb2 = new Discord.RichEmbed()
            .setColor(color.red)
            .setDescription('No message recorded. (Item Refunded.)');
          let data = db.fetch(a.author.id);
          data.bal = data.bal + this.price
          db.set(a.author.id, data);
          return a.channel.send(emb2);
        }
        
        let emb3 = new Discord.RichEmbed()
          .setColor(color.blue)
          .setDescription(`${a.author} What color should the reply have? Please send a hex color code.\n(Your next message will be recorded and used)`);
      
        a.channel.send(emb3);
        
        a.channel.awaitMessages(filter, {max: 1, time: 15000}).then(collected => {
          let c;
          
          try {
            c = collected.first().content;
            
            if(!c.startsWith('#')) {
              c = `#${c}`;
            }
        
            let emb5 = new Discord.RichEmbed()
              .setColor(color.red)
              .setDescription('Invalid HEX color code!\nPlease use this Hex color picker to choose a valid code: https://www.google.com/search?q=color+picker');
        
            if(!isHexcolor(c)) return a.channel.send(emb5);
        
            let emb6 = new Discord.RichEmbed()
              .setColor(c)
              .setDescription(t);
            
            let newr = db.fetch('responses');
            newr.push({ id: a.author.id, text: t, col: c });
            db.set('responses', newr);
            
            a.channel.send(`Custom Response set!\nTo change it use \`${prefix}edit\`.`, {embed: emb6});
              
          } catch {
            let emb4 = new Discord.RichEmbed()
              .setColor(color.red)
              .setDescription('No message recorded. (Item Refunded.)');
            let data = db.fetch(a.author.id);
            data.bal = data.bal + this.price
            db.set(a.author.id, data);
            return a.channel.send(emb4);
          }
        }).catch(err => {
          console.log(err)
          a.channel.send(err.message);
        })
        
      }).catch(err => {
        console.log(err);
        a.channel.send(err.message);
      })
      
      
    }
  }
];
//params in order: message, bot

//item example
/*
{
    name: "test",
    price: 10,
    uid: 'i1',
    description: "This is a test item.",
    execute: function(a) {
      if (!a) return new Error("No message object provided!");

      a.channel.send("Testing...");
    }
  }
*/
