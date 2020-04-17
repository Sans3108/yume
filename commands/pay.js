const Discord = require("discord.js");
const db = require("quick.db");
const f = require('../functions.js')

module.exports = {
  name: "pay",
  description: "Pay someone!",
  usage: "[Mention || ID] [amount]",
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  args: true,
  async execute(message, args, bot, color) {
    if (db.fetch(message.author.id) === null) {
      db.set(message.author.id, {
        bal: 0,
        joinedAt: Date(Date.now()).slice(4, -47),
        inventory: []
      });
    }
    
    let idORmention = false;
    if (message.guild.member(args[0])) {
      idORmention = true;
    }
    
    let user;
    let ret = false;
    if(idORmention) {
      user = args[0];
    } else {
      let temp = f.getIDfromMention(args[0]);
      if (message.guild.member(temp)) {
        user = temp;
      } else {
        ret = true;
      }
    }
    
    let emb1 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription('Invalid user!');
    
    if(ret) return message.channel.send(emb1);
    
    let emb2 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription('Cannot pay a bot user!');
    
    let isBot = await bot.fetchUser(user);
    if(isBot.bot) return message.channel.send(emb2);

    let emb3 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`<@${user}> does not play this game.`);

    if (db.fetch(user) === null) return message.channel.send(emb3);
    
    let emb4 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription("Invalid amount!");
    
    let emb7 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription('You cannot pay yourself!');
    
    if(message.author.id === user) return message.channel.send(emb7);
    
    let v;
    if(parseInt(args[1]) > 0) {
      v = false;
    } else {
      v = true;
    }
    if(v) return message.channel.send(emb4);
    
    let data = db.fetch(user);
    let authorData = db.fetch(message.author.id);
    
    if(authorData.bal >= parseInt(args[1])) {
      authorData.bal = authorData.bal - parseInt(args[1]);
      data.bal = data.bal + parseInt(args[1]);
      
      db.set(message.author.id, authorData);
      db.set(user, data);
      
      let emb5 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You paid ${parseInt(args[1])}${db.fetch('cfg').currency} to <@${user}>!\nYour balance: ${db.fetch(message.author.id).bal}${db.fetch('cfg').currency}\n<@${user}>'s balance: ${db.fetch(user).bal}${db.fetch('cfg').currency}`);
      return message.channel.send(emb5);
    } else {
      let emb6 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`You don't have enough ${db.fetch('cfg').currency}!`);
      return message.channel.send(emb6);
    }
  }
};
