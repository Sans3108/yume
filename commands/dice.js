const Discord = require("discord.js");

module.exports = {
  name: "dice",
  description: "Roll up to 6 dice with values from 1-6",
  aliases: ["roll", "die"],
  usage: "<number of dice>",
  cooldown: 2,
  execute(message, args, bot, color) {
    const dice1 = bot.emojis.find(emoji => emoji.name === "dice1");
    const dice2 = bot.emojis.find(emoji => emoji.name === "dice2");
    const dice3 = bot.emojis.find(emoji => emoji.name === "dice3");
    const dice4 = bot.emojis.find(emoji => emoji.name === "dice4");
    const dice5 = bot.emojis.find(emoji => emoji.name === "dice5");
    const dice6 = bot.emojis.find(emoji => emoji.name === "dice6");

    function roll() {
      const array = [1, 2, 3, 4, 5, 6];
      let a = array[Math.floor(Math.random() * array.length)];
      let b;

      if (a === 1) {
        b = dice1;
      } else if (a === 2) {
        b = dice2;
      } else if (a === 3) {
        b = dice3;
      } else if (a === 4) {
        b = dice4;
      } else if (a === 5) {
        b = dice5;
      } else if (a === 6) {
        b = dice6;
      }

      let c = {
        value: a,
        emote: b
      };

      return c;
    }

    let final1 = roll();
    let final2 = roll();
    let final3 = roll();
    let final4 = roll();
    let final5 = roll();
    let final6 = roll();
    let final7 = roll();
    let final8 = roll();
    let final9 = roll();
    let final10 = roll();

    //console.log(final.emote.name + '\n' + final.value);

    if (!args[0]) {
      let embed0 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote}\nTotal: ${final1.value}`
        );

      message.channel.send(embed0);
    } else if (args[0] === "1") {
      let embed1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote}\nTotal: ${final1.value}`
        );

      message.channel.send(embed1);
    } else if (args[0] === "2") {
      let embed2 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote} ${
            final2.emote
          }\nTotal: ${final1.value + final2.value}`
        );

      message.channel.send(embed2);
    } else if (args[0] === "3") {
      let embed3 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote} ${final2.emote} ${
            final3.emote
          }\nTotal: ${final1.value + final2.value + final3.value}`
        );

      message.channel.send(embed3);
    } else if (args[0] === "4") {
      let embed4 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote} ${final2.emote} ${final3.emote}\n${
            final4.emote
          }\nTotal: ${final1.value +
            final2.value +
            final3.value +
            final4.value}`
        );

      message.channel.send(embed4);
    } else if (args[0] === "5") {
      let embed5 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote} ${final2.emote} ${final3.emote}\n${
            final4.emote
          } ${final5.emote}\nTotal: ${final1.value +
            final2.value +
            final3.value +
            final4.value +
            final5.value}`
        );

      message.channel.send(embed5);
    } else if (args[0] === "6") {
      let embed6 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(
          `You rolled...\n${final1.emote} ${final2.emote} ${final3.emote}\n${
            final4.emote
          } ${final5.emote} ${final6.emote}\nTotal: ${final1.value +
            final2.value +
            final3.value +
            final4.value +
            final5.value +
            final6.value}`
        );

      message.channel.send(embed6);
    } else {
      let eEmbed = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`${args[0]} is not a number between 1-6!`);

      message.channel.send(eEmbed);
    }
  }
};
