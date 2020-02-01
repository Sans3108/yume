const Discord = require("discord.js");
const { prefix } = require("../prefix.json");

module.exports = {
    name: 'cmds',
    description: 'Shows the different help sections.',
    aliases: ['commands', 'sections'],
    cooldown: 2,
    execute(message, args, bot, color) {
      let embed1 = new Discord.RichEmbed()
      .setColor(color)
      .setTitle('Help sections:')
      .addField(`${prefix}help`, 'General commands.')
      .addField(`${prefix}devhelp`, 'Developer only commands.')
      .addField(`${prefix}staffhelp`, 'Staff only commands')
      .addField(`${prefix}dmhelp`, `Commands from ${prefix}help that can be used inside DM's.`)
      .setFooter('All help sections will be sent in DM.');
      
      message.channel.send(embed1);
    },
};