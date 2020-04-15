const Discord = require("discord.js");
const db = require("quick.db");
const f = require('../functions.js')

module.exports = {
  name: "addmoney",
  description: "Adds money to an user!",
  usage: "[Mention || ID] [amount]",
  aliases: ["am"],
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  args: true,
  async execute(message, args, bot, color) {
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
    
    let emb5 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription('Cannot add money to a bot user!');
    
    let isBot = await bot.fetchUser(user);
    if(isBot.bot) return message.channel.send(emb5);
    
    let emb2 = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription("Invalid amount!");
    
    let v;
    if(parseInt(args[1]) > 0) {
      v = false;
    } else {
      v = true;
    }
    if(v) return message.channel.send(emb2);
    
    //--------
    
    try {
      let data = db.fetch(user);
      data.bal = data.bal + parseInt(args[1]);
      db.set(user, data);

      let emb3 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You added ${args[1]}${db.fetch("cfg").currency} to user <@${user}> ! \nTheir total balance is now: ${db.fetch(user).bal}${db.fetch("cfg").currency}`);
      
      message.channel.send(emb3);
    } catch {
      db.set(user, { bal: 0, joinedAt: Date(Date.now()).slice(4, -47), inventory: [] });
      
      let data = db.fetch(user);
      data.bal = data.bal + parseInt(args[1], 10);
      db.set(user, data);

      let emb4 = new Discord.RichEmbed()
        .setColor(color.green)
        .setDescription(`You added ${args[1]}${db.fetch("cfg").currency} to user <@${user}> ! \nTheir total balance is now: ${db.fetch(user).bal}${db.fetch("cfg").currency}`);
      
      message.channel.send(emb4);
    }
  }
};