const Discord = require('discord.js');
let color = require('./colors.json');
module.exports = [
  {
    name: "Active Role",
    price: 750,
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
    description: "Wanna be a neko?",
    execute: function(a) {
      if (!a) return new Error("No message object provided!");

      a.member.addRole(a.guild.roles.find(r => r.id === '674654526015406150'));
      
      let emb2 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription('You now have the Neko role!');
      a.channel.send(emb2);
    }
  }
];
//params in order: message, 

//item example
/*
{
    name: "test",
    price: 10,
    description: "This is a test item.",
    execute: function(a) {
      if (!a) return new Error("No message object provided!");

      a.channel.send("Testing...");
    }
  }
*/