const Discord = require("discord.js");
const db = require("quick.db");
const items = require("../items.js");
const { prefix } = require("../prefix.json");
const f = require("../functions.js");
const isHexcolor = require('is-hexcolor');

module.exports = {
  name: "edit",
  description: `Edit your custom response!`,
  cooldown: 3,
  usage: "[color || text] [new value]",
  ownerOnly: true,
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

    let emb1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(
        "Invalid option! Please choose what do you want to edit in the response: `color` or `text`"
      );

    let data = db.fetch(message.author.id);

    //-----------------------------------------------------------------------------------
    let check = db.fetch("responses");
    let it = check.find(i => i.id === message.author.id) || null;
    //let it2 = check.find(i => i.name.toLowerCase() === 'Custom Response'.toLowerCase());

    let customEmb = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`You don't have a custom response set!`);

    if (it === null) return message.channel.send(customEmb);
    if (
      f.arrayContains(
        "Custom Response".toLowerCase(),
        data.inventory.map(a => a.name.toLowerCase())
      )
    )
      return message.channel.send(customEmb);
    //-----------------------------------------------------------------------------------

    if (args[0].toLowerCase() === "color") {
      let c = args[1];
            
      if(!c.startsWith('#')) {
        c = `#${c}`;
      }
        
      let emb1 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription('Invalid HEX color code!\nPlease use this Hex color picker to choose a valid code: https://www.google.com/search?q=color+picker');
        
      if(!isHexcolor(c)) return message.channel.send(emb1);
      
      let newr = db.fetch('responses');
      let obj = newr.find(i => i.id === message.author.id);
      newr.splice(newr.indexOf(obj), 1);
      obj.col = c;
      newr.push(obj);
      db.set('responses', newr);
      
      let emb2 = new Discord.RichEmbed()
        .setColor(db.fetch('responses').find(i => i.id === message.author.id).col)
        .setDescription(db.fetch('responses').find(i => i.id === message.author.id).text);
      
      return message.channel.send(`Custom Response color set!`, {embed: emb2});
    } else if (args[0].toLowerCase() === "text") {
      let t = args[1];

      let emb1 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription('Please provide the new message to set in your response!');
        
      if(!t) return message.channel.send(emb1);
      
      let newr = db.fetch('responses');
      let obj = newr.find(i => i.id === message.author.id);
      newr.splice(newr.indexOf(obj), 1);
      obj.text = t
      newr.push(obj);
      db.set('responses', newr);
      
      let emb3 = new Discord.RichEmbed()
        .setColor(db.fetch('responses').find(i => i.id === message.author.id).col)
        .setDescription(db.fetch('responses').find(i => i.id === message.author.id).text);
      
      return message.channel.send(`Custom Response color set!`, {embed: emb3});
    } else return message.channel.send(emb1);
  }
};
