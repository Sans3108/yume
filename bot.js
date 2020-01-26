//glitch thingy
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
}); 
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 80000);

//A hella ot of variables goddamnit xd
const Discord = require("discord.js");
const { ownerID } = require("./config.json");
const { prefix } = require("./prefix.json");
const fs = require('fs');

const bot = new Discord.Client(); //disable @everyone and @here mentions by adding this as a client option     {disableEveryone: true}
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
const MsgLog = true; //switch on and off the message logger

//let color = hexColor();
let color = "RANDOM"

//random number from 1 to 3
function number() {

    var array = ['1', '2', '3'];
    var rand = array[Math.floor(Math.random() * array.length)];

    return `${rand}`;
}




//Ready event
bot.on("ready", () => {
    
    bot.fetchUser(ownerID).then(u => {
      let readymessage = `-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\nBot is online!\nBot tag: @${bot.user.tag}\nBot owner: @${u.tag}\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\n`;
      console.log(readymessage); //When the bot is onine send this into console
      if (MsgLog) {
        console.log('Message logger:');
      }
    });

    //Bot status (color)
    bot.user.setStatus('online');

    //Bot rich presence
    bot.user.setPresence({
        game: {
            name: `Yume || "` + prefix + `help"`,
            type: "LISTENING"
        }
    });
});

//Message event
bot.on("message", message => {
    if (message.content === '\`\`\`xl\nPromise { <pending> }\n\`\`\`' && message.author.id === bot.user.id) {
        message.delete();
    }

    //Message logger
    if (message && !message.author.bot && MsgLog) {
        if (message.channel.type === 'text') {
            if (!message.content && message.attachments.size >= 1) {
                message.content = `_< ${message.attachments.size} attachement(s) >_`
            } else if (message.content && message.attachments.size >= 1) {
                message.content = `_< ${message.attachments.size} attachement(s) >_\n${message.content}`
            } else if (!message.content) {
                message.content = '_<empty message>_'
            }

            console.log('\x1b[36m%s\x1b[0m', `(${message.guild.name}) (#${message.channel.name}) >> ${message.author.tag}: ${message.content}`);

            let channel = message.guild.channels.find(ch => ch.name === 'yume-message-logs');
            let mEmbed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
                .setTitle(`#${message.channel.name}`)
                .setURL(`${message.url}`)
                .addField(`Message:`, `${message.content}`)
                .addField('Message link:', `${message.url}`)
                .setTimestamp();

            channel.send(mEmbed);
        } else if (message.channel.type === 'dm' && MsgLog) {
            console.log('\x1b[36m%s\x1b[0m', `(${message.channel.type}) ${message.author.tag}: ${message.content}`);
        }
    }

    //embeds for the messages
    let embed1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`That's my prefix!`);

    let embed2 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`That command doesn't exist, try again?`);

    let embed3 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`You shall not use this in DM's!`);

    let embed4 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`Command can only be used by the bot owner!\nThe bot owner is: <@${ownerID}>`);

    let embed5 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`Command is WiP (Work in Progress), undergoing maintanance/changes or it is disabled!`);

    //Message filter
    if (message.author.bot) return;


    //responses ---------------------------------------------------------------------------------------------------------------------------------------------

    //emotes
    const pout = bot.emojis.find(emoji => emoji.name === "02pout");
    const blue_soul = bot.emojis.find(emoji => emoji.name === "blue_soul");
    const xing = bot.emojis.find(emoji => emoji.name === "xing");
    const rifle = bot.emojis.find(emoji => emoji.name === "rifle");
    const jojosfx = bot.emojis.find(emoji => emoji.name === "jojosfx");
    const smug = bot.emojis.find(emoji => emoji.name === "smug");

    //embeds
    const emb1 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('_Megalovania starts playing..._');

    const emb2 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription(`_Shouldn\'t have done that, ${message.author}..._`);

    const emb3 = new Discord.RichEmbed()
        .setColor(color)
        .setDescription('_You\'re gonna have a bad time..._');

    const emb4 = new Discord.RichEmbed()
        .setColor('#990000')
        .setDescription('**Pizza will haunt you.** :ghost: :pizza:');

    const emb5 = new Discord.RichEmbed()
        .setColor('#003dbf')
        .setDescription('You dare summon me, the one who wields the power of stars?' + xing);

    const emb6 = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setDescription(`I will lick you!`);

    const emb8 = new Discord.RichEmbed()
        .setColor('#cf1e25')
        .setDescription(`${message.author} I'm gonna invade you.`);

    const emb9 = new Discord.RichEmbed()
        .setDescription(`_Golden wind starts playing..._`);

    //responses

    if (message.content.toLowerCase() === 'no u') {
        message.channel.send('no u');
    };

    if (message.content.includes('<@366536353418182657>') || message.content.includes('<@!366536353418182657>')) {
        const nr = number();
        message.react(blue_soul);

        if (nr === '1') {
            message.channel.send(emb1)
        } else if (nr === '2') {
            message.channel.send(emb2)
        } else if (nr === '3') {
            message.channel.send(emb3)
        }
    };

    if (message.content.includes('<@489901090603663400>') || message.content.includes('<@!489901090603663400>')) {
        const nr = number();
        if (nr === '1' || nr === '3') {
            message.channel.send('Togoctober standing by')
        } else if (nr === '2') {
            message.channel.send(`${message.author} HMS TOG enroute`)
        }
    };

    if (message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'hey') {
        const nr = number();
        if (nr === '1') {
            message.channel.send(`Hello! ${message.author}`)
        } else if (nr === '2') {
            message.channel.send(`Hi! ${message.author}`)
        } else if (nr === '3') {
            message.channel.send(`Hey! ${message.author}`)
        }
    };

    if (message.content.includes('<@565101979349549056>') || message.content.includes('<@!565101979349549056>')) {
        message.react(smug);
        message.channel.send(emb6);
    };

    if (message.content.includes('<@238717249626570753>') || message.content.includes('<@!238717249626570753>')) {
        message.react('👻')
        message.react('🍕')
        message.channel.send(emb4);
    };

    if (message.content.includes('<@143160118090006530>') || message.content.includes('<@!143160118090006530>')) {
        message.react(xing)
        message.channel.send(emb5);
    };

    if (message.content.includes('<@258872670723112960>') || message.content.includes('<@!258872670723112960>')) {
        message.react(rifle)
        message.channel.send(emb8);
    }

    if (message.content.includes('<@431070484889862144>') || message.content.includes('<@!431070484889862144>')) {
        message.react(jojosfx)
        message.channel.send(emb9);
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------


    if (!message.content.startsWith(prefix)) return;
    if (message.content === prefix) return message.channel.send(embed1);

    //-------

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.channel.send(embed2);

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.channel.send(embed3);
    }

    if (command.args && !args.length) {
        let reply = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`You didn't provide any arguments, ${message.author}!`)

        if (command.usage) {
            reply.setDescription(`You didn't provide any arguments, ${message.author}!\nThis would be the proper usage: \`${prefix}${command.name} ${command.usage}\``);
        }

        return message.channel.send(reply);
    }

    if (command.ownerOnly && message.author.id !== ownerID) return message.channel.send(embed4)

    if (command.wip) return message.channel.send(embed5)

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

            let cooldownembed = new Discord.RichEmbed()
                .setColor(color)
                .setDescription(`(Cooldown) Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);

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
            .setColor(color)
            .setDescription(`Sorry, there was a error...\nThe error looks like this:\n\`\`\`${error}\`\`\``);

        message.channel.send(erremb);
    }
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    //Edited messages logger
    if (newMessage && !newMessage.author.bot && MsgLog) {
        if (newMessage.channel.type === 'text') {
            if (!newMessage.content && newMessage.attachments.size >= 1) {
                newMessage.content = `_< ${newMessage.attachments.size} attachement(s) >_`
            } else if (newMessage.content && newMessage.attachments.size >= 1) {
                newMessage.content = `_< ${newMessage.attachments.size} attachement(s) >_\n${newMessage.content}`
            } else if (!newMessage.content) {
                newMessage.content = '_<empty message>_'
            }

            console.log('\x1b[36m%s\x1b[0m', `(${newMessage.guild.name}) (#${newMessage.channel.name}) >> ${newMessage.author.tag}: (edited): ${newMessage.content}`);

            let eChannel = newMessage.guild.channels.find(chn => chn.name === 'yume-message-logs');
            let mEembed = new Discord.RichEmbed()
                .setAuthor(`${newMessage.author.tag}`, `${newMessage.author.displayAvatarURL}`)
                .setTitle(`#${newMessage.channel.name}`)
                .addField(`Old message:`, `${oldMessage.content}`)
                .addField(`New message:`, `${newMessage.content}`)
                .addField('Message link:', `${newMessage.url}`)
                .setTimestamp();

            eChannel.send(mEembed);
        } else if (newMessage.channel.type === 'dm' && MsgLog) {
            console.log('\x1b[36m%s\x1b[0m', `(${newMessage.channel.type}) ${newMessage.author.tag}: (edited): ${newMessage.content}`);
        }
    }
});

//Bot login
bot.login(process.env.TOKEN);

bot.on('error', console.error);

//console.log(bot.commands.filter(c => !c.ownerOnly))
//console.log(bot.commands)
//console.log(bot.commands.filter(c => c.ownerOnly))
