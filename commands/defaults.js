const Discord = require("discord.js");
const db = require('quick.db');
const { default_currency } = require('../cfg.json');

module.exports = {
  name: "defaults",
  cooldown: 3,
  ownerOnly: true,
  guildOnly: true,
  shop: true,
  execute(message, args, bot, color) {
    //------------------------------------------------------------------------------------------------------------
    db.set('cfg', { currency: default_currency });
    db.set('i1', { stock: "Inf." });
    db.set('i2', { stock: "Inf." });
    db.set('i3', { stock: "Inf." });
    db.set('i4', { stock: "Inf." });
    db.set('i5', { stock: "Inf." });
    db.set('i6', { stock: "Inf." });
    db.set('i7', { stock: 0 });
    db.set('i8', { stock: "Inf." });
    db.set('i9', { stock: "Inf." });
    db.set('366536353418182657', { bal: 29, joinedAt: "Apr 13 2020" });
    db.set('231145431332028419', { bal: 97, joinedAt: "Apr 24 2020" });
    db.set('143160118090006530', { bal: 272, joinedAt: "Apr 24 2020" });
    db.set('508180436997111808', { bal: 408, joinedAt: "Apr 24 2020" });
    db.set('490278978704244736', { bal: 250, joinedAt: "Apr 24 2020" });
    db.set('680771525850431522', { bal: 292, joinedAt: "Apr 24 2020" });
    db.set('489901090603663400', { bal: 149, joinedAt: "Apr 24 2020" });
    db.set('422475377605214218', { bal: 45, joinedAt: "Apr 24 2020" });
    db.set('565101979349549056', { bal: 287, joinedAt: "Apr 24 2020" });
    db.set('584374885426397205', { bal: 306, joinedAt: "Apr 24 2020" });
    db.set('614408803521396776', { bal: 155, joinedAt: "Apr 24 2020" });
    db.set('258872670723112960', { bal: 27, joinedAt: "Apr 24 2020" });
    db.set('169604611634757632', { bal: 91, joinedAt: "Apr 24 2020" });
    db.set('responses', []);
    db.set('456116310439362561', { bal: 18, joinedAt: "Apr 26 2020" });
    db.set('359608234199220224', { bal: 250, joinedAt: "Apr 26 2020" });
    db.set('246737164807700481', { bal: 273, joinedAt: "Apr 26 2020" });
    db.set('258644138059235329', { bal: 16, joinedAt: "Apr 27 2020" });
    db.set('128522541600866304', { bal: 29, joinedAt: "Apr 27 2020" });
    db.set('505016787830833152', { bal: 358, joinedAt: "Apr 27 2020" });
    db.set('169170394689961986', { bal: 10, joinedAt: "Apr 28 2020" });
    
    //------------------------------------------------------------------------------------------------------------
    
    let a = new Discord.RichEmbed()
      .setColor(color.green)
      .setDescription('Done.');
    
    message.channel.send(a);
  }
};