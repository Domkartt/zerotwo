const Discord = require("discord.js");
const db = require('quick.db')
const prefix = "+"

module.exports.run = async (bot, message, args) => {
if(message.content.charAt(0) !== "+") return;
    var x = Math.floor(Math.random() * (1, 59));
  if(x == "20" || x == "09" || x == "02") x++;
  var money = Math.floor(Math.random() * (5, 25))
  var otvet = db.fetch(`moneys_${message.author.id}_${message.guild.id}`)
  if (otvet <= 5) { return message.reply("Сорри, ты бомжик \c:"); }
if (x < 10) {let url = `https://cdn.nekos.life/smug/smug_0${x}.gif`
  
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Smug")
      .setImage(url)
      .setColor("#f1d4d9")
      .setFooter(`С вашего баланса было снято ${money} `+"💸")
      .setURL(url);
  message.channel.send(lewdembed);
}
  else {
  let url2 = `https://cdn.nekos.life/smug/smug_0${x}.gif`
  
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Smug")
      .setImage(url2)
      .setColor(`#f1d4d9`)
      .setFooter(`С вашего баланса было снято ${money} `+"💸")
      .setURL(url2);
  message.channel.send(lewdembed);
}
}
             
 
module.exports.help = {
  name: "smug"
}