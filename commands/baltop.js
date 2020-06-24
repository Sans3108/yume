const Discord = require("discord.js");
const db = require('quick.db');
const _ = require("lodash");

module.exports = {
  name: "bal-top",
  description: "Check top balances in the server!",
  aliases: ['baltop', 'bt'],
  cooldown: 3,
  guildOnly: true,
  shop: true,
  execute: async (message, args, bot, color) => {

    await message.guild.fetchMembers()
      .then(() => console.log('Fetched Members.'))
      .catch(e => {
        console.error(e);
        return message.channel.send('I\'m sorry this happened, there was an error.');
      })

    let filtered = db.all().filter(function (obj) {
      return obj.ID !== 'cfg' && obj.ID !== 'i1' && obj.ID !== 'i2' && obj.ID !== 'i3' && obj.ID !== 'i4' && obj.ID !== 'i5' && obj.ID !== 'i6' && obj.ID !== 'i7' && obj.ID !== 'i8' && obj.ID !== 'i9' && obj.ID !== 'responses';
    });

    let all = [];

    await filtered.forEach(o => {
      message.guild.fetchMember(o.ID)
        .then(m => {
          all.push(m.id);
        })
        .catch(e => {
          console.error(e.message);
        })
    });

    let icon = message.guild.iconURL//.slice(0, -3) + 'gif';

    let howMany = 10;

    let toSort = [];

    await all.forEach(item => {
      toSort.push({ id: item, balance: db.fetch(item).bal })
    })

    let sortedBalances = toSort.sort((a, b) => b.balance - a.balance);

    let sorted = sortedBalances.map(item => item.id)

    if (!sorted[howMany]) {

      let specialEmb = new Discord.RichEmbed()
        .setColor(color.blue)
        .setThumbnail(icon)
        .setTitle("**Balance top**")
        .setDescription(`_The most rich members of this server._\n`);

      if (sorted.length + 1 === 1) {
        specialEmb.setFooter(`${all.length} entry`);
      } else {
        specialEmb.setFooter(`${all.length} entries`);
      }

      let counter = 0;
      await sorted.forEach(async item => {

        let user = await message.guild.fetchMember(item);
        let player = db.fetch(item);

        counter++;
        emb.addField(`**#${counter}.** ${user.displayName}`, `Balance: ${player.bal}${db.fetch('cfg').currency}`);
      });
      
      return message.channel.send(specialEmb);
    }

    let chunks = _.chunk(sorted, howMany);
    let pages = [];
    let totalPages = chunks.length;
    let pageCount = 0;
    let itemCount = 0;

    await chunks.forEach(async chunk => {
      let emb = new Discord.RichEmbed()
        .setColor(color.blue)
        .setThumbnail(icon)
        .setTitle("**Balance top**")
        .setDescription(`_The most rich members of this server._\n`);

      await chunk.forEach(async item => {
        
        let user = await message.guild.fetchMember(item);
        let player = db.fetch(item);
        
        itemCount++;
        emb.addField(`**#${itemCount}.** ${user.displayName}`, `Balance: ${player.bal}${db.fetch('cfg').currency}`);
      });

      pageCount = pageCount + 1;

      if (sorted.length + 1 === 1) {
        emb.setFooter(`Page: ${pageCount}/${totalPages} | ${sorted.length} entry`);
      } else {
        emb.setFooter(`Page: ${pageCount}/${totalPages} | ${sorted.length} entries`);
      }

      pages.push({ count: pageCount, emb: emb });
    });

    let emb2 = new Discord.RichEmbed()
      .setColor(color.blue)
      .setThumbnail(icon)
      .setTitle("**Balance top**")
      .setDescription('Loading...')
      .setFooter(`Page: ?/?`);

    let msg = await message.channel.send(emb2);

    let currentPage = 1;

    await msg.edit('', { embed: pages[0].emb });

    await msg.react('⬅');
    await msg.react('⏹');
    await msg.react('➡');

    const filter = (reaction, user) => {
      return reaction.emoji.name === '⬅' || reaction.emoji.name === '⏹' || reaction.emoji.name === '➡' && user.id !== bot.user.id && !user.bot;
    };

    const collector = msg.createReactionCollector(filter, { time: 120000 });

    collector.on('collect', reaction => {
      if (reaction.emoji.name === '⏹') {
        collector.stop();
      } else if (reaction.emoji.name === '➡') {
        if (currentPage < totalPages) {
          currentPage = currentPage + 1;

          let page = pages.find(page => page.count === currentPage);

          msg.edit('', { embed: page.emb });
        }
      } else if (reaction.emoji.name === '⬅') {
        if (currentPage > 1) {
          currentPage = currentPage - 1;

          let page = pages.find(page => page.count === currentPage);

          msg.edit('', { embed: page.emb });
        }
      }
    });

    collector.on('end', collected => {
      msg.clearReactions();
    });
  }
};