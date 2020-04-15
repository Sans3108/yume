//glitch ping thingy so the bot doesn't go offline
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 50000);

//A hella ot of variables goddamnit xd
const Discord = require("discord.js");
const { ownerID } = require("./config.json");
const { prefix } = require("./prefix.json");
const fs = require("fs");
const db = require("quick.db");

const noLog = require("./excluded-channels.js");

const bot = new Discord.Client(); //disable @everyone and @here mentions by adding this as a client option     {disableEveryone: true}
bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

const MsgLog = true; //switch on and off the message logger
const devMode = false; //turn on and off dev mode, no one other than the owner can use commands

//let color = hexColor();
let color = require('./colors.json');

//random number from 1 to 3
function number() {
  var array = ["1", "2", "3"];
  var rand = array[Math.floor(Math.random() * array.length)];

  return `${rand}`;
}

bot.once("reconnecting", () => {
  console.log("Reconnecting!");
});
bot.once("disconnect", () => {
  console.log("Disconnect!");
});

//Ready event
bot.on("ready", () => {
  bot.fetchUser(ownerID).then(u => {
    let readymessage = `-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\nBot is online!\nBot tag: @${bot.user.tag}\nBot owner: @${u.tag}\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-`;
    console.log(readymessage); //When the bot is onine send this into console
    if (devMode) {
      console.log("Developer Mode = ON");
    }
    if (MsgLog) {
      console.log("Message Logger:");
    } else {
      console.log("Message Logger = OFF");
    }
  });

  if (devMode) {
    //Bot status (color)
    bot.user.setStatus("idle");

    //Bot rich presence
    bot.user.setPresence({
      game: {
        name: `Currently being updated...`,
        type: "PLAYING"
      }
    });
  } else {
    //Bot status (color)
    bot.user.setStatus("online");

    //Bot rich presence
    bot.user.setPresence({
      game: {
        name: `Yume | "` + prefix + `help"`,
        type: "LISTENING"
      }
    });
  }
});

//Uhh
bot.once("reconnecting", () => {
  console.log("Reconnecting!");
});

bot.once("disconnect", () => {
  console.log("Disconnect!");
});

//Message event
bot.on("message", message => {
  if (
    message.content === "```xl\nPromise { <pending> }\n```" &&
    message.author.id === bot.user.id
  ) {
    message.delete();
  }

  //Message logger
  if (message && !message.author.bot && MsgLog) {
    if (!noLog.exc.includes(message.channel.id)) {
      if (message.channel.type === "text") {
        if (!message.content && message.attachments.size >= 1) {
          message.content = `_< ${message.attachments.size} attachement(s) >_`;
        } else if (message.content && message.attachments.size >= 1) {
          message.content = `_< ${message.attachments.size} attachement(s) >_\n${message.content}`;
        } else if (!message.content) {
          message.content = "_<empty message>_";
        }

        console.log(
          "\x1b[36m%s\x1b[0m",
          `(${message.guild.name}) (#${message.channel.name}) >> ${message.author.tag}: ${message.content}`
        );

        let channel = message.guild.channels.find(
          ch => ch.id === "625609556252295168"
        );
        let mEmbed = new Discord.RichEmbed()
          .setAuthor(
            `${message.author.tag} in #${message.channel.name}`,
            `${message.author.displayAvatarURL}`
          )
          .setTitle(`Message:`)
          .setURL(`${message.url}`)
          .setDescription(`${message.content}`)
          .addField("Message link:", `${message.url}`)
          .setTimestamp();

        channel.send(mEmbed);
      } else if (message.channel.type === "dm" && MsgLog) {
        console.log(
          "\x1b[36m%s\x1b[0m",
          `(${message.channel.type}) ${message.author.tag}: ${message.content}`
        );
      }
    }
  }

  //embeds for the messages
  let embed1 = new Discord.RichEmbed()
    .setColor(color.blue)
    .setDescription(`That's my prefix!`);

  let embed2 = new Discord.RichEmbed()
    .setColor(color.blue)
    .setDescription(`That command doesn't exist, try again?`);

  let embed3 = new Discord.RichEmbed()
    .setColor(color.red)
    .setDescription(`You shall not use this in DM's!`);

  let embed4 = new Discord.RichEmbed()
    .setColor(color.red)
    .setDescription(
      `Command can only be used by the bot owner!\nThe bot owner is: <@${ownerID}>`
    );

  let embed6 = new Discord.RichEmbed()
    .setColor(color.red)
    .setDescription(
      `I can't execute commands while <@${ownerID}> is updating my code!`
    );

  //Message filter
  if (message.author.bot) return;

  //responses ---------------------------------------------------------------------------------------------------------------------------------------------

  //emotes
  const pout = bot.emojis.find(emoji => emoji.name === "02pout");
  const blue_soul = bot.emojis.find(emoji => emoji.name === "blue_soul");
  const xing = bot.emojis.find(emoji => emoji.name === "xing");
  const rifle = bot.emojis.find(emoji => emoji.name === "rifle");
  const jojosfx = bot.emojis.find(emoji => emoji.name === "jojosfx");

  //embeds
  const emb1 = new Discord.RichEmbed()
    .setColor(color.random)
    .setDescription("_Megalovania starts playing..._");

  const emb2 = new Discord.RichEmbed()
    .setColor(color.random)
    .setDescription(`_Shouldn\'t have done that, ${message.author}..._`);

  const emb3 = new Discord.RichEmbed()
    .setColor(color.random)
    .setDescription("_You're gonna have a bad time..._");

  const emb4 = new Discord.RichEmbed()
    .setColor("#990000")
    .setDescription("**Pizza will haunt you.** :ghost: :pizza:");

  const emb5 = new Discord.RichEmbed()
    .setColor("#003dbf")
    .setDescription(
      "You dare summon me, the one who wields the power of stars?" + xing
    );

  //Free to use
  const emb6 = new Discord.RichEmbed()
    .setColor(color.orange)
    .setDescription(`Sample text`);

  const emb8 = new Discord.RichEmbed()
    .setColor("#cf1e25")
    .setDescription(`${message.author} I'm gonna invade you.`);

  const emb9 = new Discord.RichEmbed().setDescription(
    `_Golden wind starts playing..._`
  );

  //function
  function hasPing(id) {
    let v;
    if (
      message.content.includes(`<@${id}>`) ||
      message.content.includes(`<@!${id}>`)
    ) {
      v = true;
    } else {
      v = false;
    }

    return v;
  }

  //responses

  if (message.content.toLowerCase() === "no u") {
    message.channel.send("no u");
  }

  if (
    hasPing("366536353418182657") &&
    message.author.id !== "366536353418182657"
  ) {
    const nr = number();
    message.react(blue_soul);

    if (nr === "1") {
      message.channel.send(emb1);
    } else if (nr === "2") {
      message.channel.send(emb2);
    } else if (nr === "3") {
      message.channel.send(emb3);
    }
  }

  if (
    hasPing("489901090603663400") &&
    message.author.id !== "489901090603663400"
  ) {
    const nr = number();
    if (nr === "1" || nr === "3") {
      message.channel.send("Togoctober standing by");
    } else if (nr === "2") {
      message.channel.send(`${message.author} HMS TOG enroute`);
    }
  }

  if (
    message.content.toLowerCase() === "hi" ||
    message.content.toLowerCase() === "hello" ||
    message.content.toLowerCase() === "hey"
  ) {
    const nr = number();
    if (nr === "1") {
      message.channel.send(`Hello! ${message.author}`);
    } else if (nr === "2") {
      message.channel.send(`Hi! ${message.author}`);
    } else if (nr === "3") {
      message.channel.send(`Hey! ${message.author}`);
    }
  }

  if (
    hasPing("238717249626570753") &&
    message.author.id !== "238717249626570753"
  ) {
    message.react("👻");
    message.react("🍕");
    message.channel.send(emb4);
  }

  if (
    hasPing("143160118090006530") &&
    message.author.id !== "143160118090006530"
  ) {
    message.react(xing);
    message.channel.send(emb5);
  }

  if (
    hasPing("258872670723112960") &&
    message.author.id !== "258872670723112960"
  ) {
    message.react(rifle);
    message.channel.send(emb8);
  }

  if (
    hasPing("431070484889862144") &&
    message.author.id !== "431070484889862144"
  ) {
    message.react(jojosfx);
    message.channel.send(emb9);
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  if (!message.content.startsWith(prefix)) return;
  if (message.content === prefix) return message.channel.send(embed1);

  //-------

  const args = message.content.slice(prefix.length).split(/ +/); //message.content.substring(prefix.length).split(/ +/);

  const commandName = args.shift().toLowerCase();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return message.channel.send(embed2);

  if (command && devMode && message.author.id !== ownerID)
    return message.channel.send(embed6);

  if (command.guildOnly && message.channel.type !== "text") {
    return message.channel.send(embed3);
  }

  if (command.args && !args.length) {
    let reply = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(`You didn't provide any arguments, ${message.author}!`);

    if (command.usage) {
      reply.setDescription(
        `You didn't provide any arguments, ${message.author}!\nThis would be the proper usage: \`${prefix}${command.name} ${command.usage}\``
      );
    }

    return message.channel.send(reply);
  }

  if (command.ownerOnly && message.author.id !== ownerID)
    return message.channel.send(embed4);

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      let hours = Math.floor(timeLeft / 3600);
      let r1 = timeLeft % 3600;
      let minutes = Math.floor(r1 / 60);
      let seconds = Math.floor(r1 % 60);
      
      let finalTime;
      
      if(hours !== 0 && minutes !== 0 && seconds !== 0) {
        finalTime = `${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
      } else if(hours !== 0 && minutes !== 0 && seconds === 0) {
        finalTime = `${hours} hour(s) and ${minutes} minute(s)`;
      } else if(hours !== 0 && minutes === 0 && seconds === 0) {
        finalTime = `${hours} hour(s)`;
      } else if(hours !== 0 && minutes === 0 && seconds !== 0) {
        finalTime = `${hours} hour(s) and ${seconds} second(s)`;
      } else if(hours === 0 && minutes !== 0 && seconds !== 0) {
        finalTime = `${minutes} minute(s) and ${seconds} second(s)`;
      } else if(hours === 0 && minutes !== 0 && seconds === 0) {
        finalTime = `${minutes} minute(s)`;
      } else if(hours === 0 && minutes === 0 && seconds === 0) {
        finalTime = `${seconds} second(s)`;
      } else if(hours === 0 && minutes === 0 && seconds !== 0) {
        finalTime = `${seconds} second(s)`;
      } else {
        finalTime = '`You should not see this message, contact Sans ASAP!!!`';
      }

      let cooldownembed = new Discord.RichEmbed()
        .setColor(color.red)
        .setDescription(
          `(Cooldown) Please wait ${finalTime} before reusing the \`${command.name}\` command.`
        );

      return message.channel.send(cooldownembed);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, bot, color, command, fs);
  } catch (error) {
    console.error(error);

    const erremb = new Discord.RichEmbed()
      .setColor(color.red)
      .setDescription(
        `Sorry, there was a error...\nThe error looks like this:\n\`\`\`${error}\`\`\``
      );

    message.channel.send(erremb);
  }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
  //Edited messages logger
  if (newMessage && !newMessage.author.bot && MsgLog) {
    if (!noLog.exc.includes(newMessage.channel.id)) {
      if (newMessage.channel.type === "text") {
        if (!newMessage.content && newMessage.attachments.size >= 1) {
          newMessage.content = `_< ${newMessage.attachments.size} attachement(s) >_`;
        } else if (newMessage.content && newMessage.attachments.size >= 1) {
          newMessage.content = `_< ${newMessage.attachments.size} attachement(s) >_\n${newMessage.content}`;
        } else if (!newMessage.content) {
          newMessage.content = "_<empty message>_";
        }

        console.log(
          "\x1b[36m%s\x1b[0m",
          `(${newMessage.guild.name}) (#${newMessage.channel.name}) >> ${newMessage.author.tag}: (edited): ${newMessage.content}`
        );

        let eChannel = newMessage.guild.channels.find(
          chn => chn.id === "625609556252295168"
        );

        if (oldMessage.content.length > 1024) {
          let mEembed = new Discord.RichEmbed()
            .setAuthor(
              `${newMessage.author.tag} in #${newMessage.channel.name}`,
              `${newMessage.author.displayAvatarURL}`
            )
            .setTitle(`Edited Message:`)
            .setURL(`${newMessage.url}`)
            .setDescription(`${newMessage.content}`)
            .addField(
              `Old Message: (part 1)`,
              `${oldMessage.content.slice(0, oldMessage.content.length - 1024)}`
            )
            .addField(
              `Old Message: (part 2)`,
              `${oldMessage.content.slice(1024)}`
            )
            .addField("Message link:", `${newMessage.url}`)
            .setTimestamp();

          eChannel.send(mEembed);
        } else {
          let mEembed = new Discord.RichEmbed()
            .setAuthor(
              `${newMessage.author.tag} in #${newMessage.channel.name}`,
              `${newMessage.author.displayAvatarURL}`
            )
            .setTitle(`Edited Message:`)
            .setURL(`${newMessage.url}`)
            .setDescription(`${newMessage.content}`)
            .addField(`Old Message:`, `${oldMessage.content}`)
            .addField("Message link:", `${newMessage.url}`)
            .setTimestamp();

          eChannel.send(mEembed);
        }
      } else if (newMessage.channel.type === "dm" && MsgLog) {
        console.log(
          "\x1b[36m%s\x1b[0m",
          `(${newMessage.channel.type}) ${newMessage.author.tag}: (edited): ${newMessage.content}`
        );
      }
    }
  }
});

//Bot login
bot.login(process.env.TOKEN);

bot.on("error", console.error);

/*
if (str.length > 5) {
console.log(`${str.slice(0, str.length - 5)} && ${str.slice(5)}`)
} else {
console.log(str)
}
*/

