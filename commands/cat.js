const superagent = require("snekfetch");
const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
if(message.content.charAt(0) !== "+") return;
    superagent.get('http://aws.random.cat//meow')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setTitle("Cat")
      .setImage(response.body.file)
      .setColor("#f1d4d9")
      .setFooter(`Tags: cat`)
      .setURL(response.body.file);
  message.channel.send(lewdembed);
    })
	
}

module.exports.help = {
  name: "cat"
}