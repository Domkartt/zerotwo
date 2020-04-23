  const Discord = require('discord.js');
const snekfetch = require('snekfetch');
exports.run = (client, message, args) => {
if(message.content.charAt(0) !== "+") return;
    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
      if(!args[0]) return;
    if(!message.channel.nsfw) return message.channel.send("`Edit channel => NSFW channel on`");

    snekfetch.get(`https://yande.re/post.json?tags=${args.join("+")}&limit=10&api_version=2&filter=1&include_tags=0&include_votes=0&include_pools=0`)
    
    .end((err, response) => {
      if(!response.body.posts[getRandomInRange(0, 9)].file_url) return;
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage(response.body.posts[getRandomInRange(0, 9)].file_url)
    .setColor("#f1d4d9")
    .setFooter("yande.re")
    .setTimestamp();
    message.channel.send(embed);
    })
}

module.exports.help = {
  name: "yandere"
}