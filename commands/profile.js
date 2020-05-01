const Discord = require("discord.js");
const db = require("quick.db");
const f = require("../functions.js");
const { prefix } = require('../prefix.json');

module.exports = {
  name: "profile",
  description: "Check yours or someone else's profile!",
  usage: "<Mention || ID>",
  cooldown: 1,
  guildOnly: true,
  shop: true,
  async execute(message, args, bot, color) {
    if (args[0]) {
      //user specified

      let idORmention = false;
      if (message.guild.member(args[0])) {
        idORmention = true;
      }

      let user;
      let ret = false;
      if (idORmention) {
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
        .setDescription("Invalid user!");

      if (ret) return message.channel.send(emb1);

      let emb2 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription("That user is a bot!");

      let isBot = await bot.fetchUser(user);
      if (isBot.bot) return message.channel.send(emb2);

      let emb3 = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(`<@${user}> does not play this game.`);

      if (db.fetch(user) === null) return message.channel.send(emb3);

      let data = db.fetch(user);
      let a = await bot.fetchUser(user);
      let b = message.guild.member(user);

      let emb4 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setAuthor(b.displayName, a.displayAvatarURL, a.displayAvatarURL)
        .setThumbnail(a.displayAvatarURL)
        .setTitle(`__${b.displayName}'s profile:__`)
        .addField("Balance", `${data.bal}${db.fetch("cfg").currency}`)
        .addField("Started playing at", `${data.joinedAt}`);
      
      let responses = db.fetch('responses')

      message.channel.send(emb4);
    } else {
      //no user specified

      if (db.fetch(message.author.id) === null) {
        db.set(message.author.id, {
          bal: 0,
          joinedAt: Date(Date.now()).slice(4, -47)
        });
      }

      let data = db.fetch(message.author.id);
      let a = await bot.fetchUser(message.author.id);
      let b = message.guild.member(message.author.id);

      let inv;
      if (data.inventory.length[0]) {
        inv = data.inventory.map(a => a.name).join(", ");
      } else {
        inv = "_<empty>_";
      }

      let emb5 = new Discord.RichEmbed()
        .setColor(color.blue)
        .setAuthor(b.displayName, a.displayAvatarURL, a.displayAvatarURL)
        .setThumbnail(a.displayAvatarURL)
        .setTitle(`__Your profile:__`)
        .addField("Balance", `${data.bal}${db.fetch("cfg").currency}`)
        .addField("Started playing at", `${data.joinedAt}`);

      message.channel.send(emb5);
    }
  }
};
