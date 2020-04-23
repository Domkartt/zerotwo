const Discord = require("discord.js"); 
const client = new Discord.Client();
const fs = require('fs');
const Canvas = require('canvas');
const helper = require('./helper.json');
const ms = require('parse-ms');
const cd = new Set();
const queue = new Map();
client.commands = new Discord.Collection();
const ytdl = require('ytdl-core');
const {
	prefix,
	token,
} = require('./config.json');
const config = require('./config.json'); 
const db = require('quick.db');

var http = require("http")
var express = require('express');
var app = express(); 

//antioff
app.get("/", (request, response) => {
  console.log("You're banned!");
  response.sendStatus(200);
});

// Это позволит боту работать 24/7
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



fs.readdir("./commands/", (err, files) => {
  
  const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
  
  client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });

});

client.on("message", async message => {
  if (message.author.bot) return;
  
 //if (message.author.id == '204255221017214977') message.delete();
  
  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
});

const guild = client.guilds.get('702155034929922149');

client.on('message', async message => { //Считает каждое сообщение
    if(message.author.id == 583662468421779456 || message.author.id == 373872608027869184) {
        let nyam = client.emojis.find(emoji => emoji.name === "emoji_38"); //берёт эмодзи :nyam: unnamed
      
        message.react(nyam);
      //message.delete();
        
    }
  });

client.on('ready', (message) => {
  setInterval( () => {
let voice = 0;
client.guilds.get("481902964710309908").channels.filter(chan => chan.type === 'voice').forEach((channel) => {voice += channel.members.size});
client.channels.get("600392871488651287").setName(`Голосовой онлайн: ${voice}`);
client.channels.get("599711379858915328").setName(`Серверов: ${client.guilds.size} | 200`); //${Date.now() - message.createdTimestamp 
client.channels.get("604384539170701312").setName(`Пинг: ${Math.round(client.ping)}`);
client.channels.get("599711012551131137").setName(`Участников: ${client.users.size}`);
    
  }, 15000)
//client.user.setGame(gamePresence[i%gamePresence.length], 'https://www.twitch.tv/monstercat');
    var timer = client.setInterval(function () {    
        client.user.setActivity("月光 - Moonlight", {
  type: "streaming",
  url: "https://www.twitch.tv/ZeroTwo"
});
    },2000)//время в ms изменения текста (1 секунда - 1000)
  
  //const serverUs = client.guild.members.filter(m => m.presence.status === 'online').size;
});

client.on('guildMemberAdd',(member)=>{

  if(member.guild.id == "702155034929922149") {

var lewdembed = new Discord.RichEmbed()
.setColor(`#f1d4d9`)
.setTitle("**月光 - Moonlight** Новый участник!")
.setDescription("Добро пожаловать *" + member + "* на **月光 - Moonlight** дискорд сервер!")
.setTimestamp()
.setFooter('©月光 - ZeroTwo 2019 - 2020', 'https://cdn.discordapp.com/attachments/607886877575479296/702618520797708319/thumb-148276.jpg');

member.guild.channels.get('702155034929922152').send(lewdembed);
  }
  
});

client.login(token);