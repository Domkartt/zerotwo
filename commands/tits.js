const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
if(message.content.charAt(0) !== "+") return;
    if (!message.channel.nsfw) return message.channel.send('Ты должен использовать это в nsfw канале!')
    superagent.get('https://nekos.life/api/v2/img/tits')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Hentai")
      .setImage(response.body.url)
      .setColor("#f1d4d9")
      .setFooter(`Tags: tits`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
}

module.exports.help = {
  name: "tits"
}