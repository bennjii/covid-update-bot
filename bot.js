const Discord = require("discord.js");
const botSettings = require("./BotSettings.json");
const prefix = botSettings.prefix;
const hook = new Discord.WebhookClient('webhook id', 'webhook token');
const bot = new Discord.Client({disableEveryone: true});
//const token = process.env.token;

const token = botSettings.token += botSettings.token2 += botSettings.token3 += botSettings.token4;

bot.on("ready", async () => {
    console.log('COVID-UPDATE is ready!');

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on('ready', () => {
    bot.user.setStatus('online')
    bot.user.setActivity('The World', { type: 'WATCHING' });
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

	if(message.content == prefix + 'ping') {
		let author = message.author.tag;
		startTime = Date.now();

		message.channel.send("Your Ping is...").then((message) => {
			endTime = Date.now();

			let ping = Math.round(endTime - startTime)
			let rounded = ping / 1000

			message.edit(`**pong** :clock10: ${ping}ms | ${rounded} seconds.`)
			console.log('Pinged by' + author + '!')
		});
    }else if(message.content == prefix + 'covid') {
        let color = message.member.displayHexColor;
        let country = "New Zealand";
        

        var response = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('COVID-19 Data for **' + country + '**')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            );
        
        message.channel.send(response);
    }
});

bot.login(token);
// https://discordapp.com/oauth2/authorize?client_id=705614558261280778&scope=bot