const Discord = require('discord.js');
const client = new Discord.Client();
const chat = require('cleverbot-free')
const config = require(`./config.json`);


client.on('ready', () => {
  console.log('Online')
})


client.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.id == '814718152646328351'){
    message.channel.startTyping()
    const reply = await chat(message)
    setTimeout(function(){
        message.reply(reply)
    }, 1500);
    message.channel.stopTyping()
    console.log(`[${message.author.tag}]: ${message.content}`)
    console.log(`[ME]: ${reply}`)
  }
})

client.login(config.token)