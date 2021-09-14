const Discord = require('discord.js');
const client = new Discord.Client()
const config = require(`./config.json`);
const querystring = require('querystring');
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log('Ready!');
})

client.on('message', async message => {
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'define') {
    if (!args.length) {
      return message.channel.send('You need to supply a search term!');
    }

    const query = querystring.stringify({ term: args.join(' ') });

    const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
      .then(response => response.json());

    if (!list.length) {
      return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

    const [answer] = list;

    const embed = new Discord.MessageEmbed()
      .setColor('#EFFF00')
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addFields(
        { name: 'Definition', value: trim(answer.definition, 1024) },
        { name: 'Example', value: trim(answer.example, 1024) },
      )
      .setTimestamp()
      .setFooter(`${answer.thumbs_up} 👍| ${answer.thumbs_down} 👎`)

    message.channel.send(embed);

  }
})

client.login("NzgyMTI4MDI2Njk5MDM4NzIw.X8HrfA.a3dnhLa4GYqxV7B-MA8OP6nLrrY")