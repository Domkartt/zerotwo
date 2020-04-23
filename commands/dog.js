const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
if(message.content.charAt(0) !== "+") return;
    superagent.get('https://random.dog/woof.json')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Dog")
      .setImage(response.body.url)
      .setColor("#f1d4d9")
      .setFooter(`Tags: dog`)
      .setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
}

module.exports.help = {
  name: "dog"
}