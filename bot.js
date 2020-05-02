const Discord = require("discord.js");
const https = require('https');
const botSettings = require("./BotSettings.json");
const prefix = botSettings.prefix;
const hook = new Discord.WebhookClient('webhook id', 'webhook token');
const bot = new Discord.Client({disableEveryone: true});
//const token = process.env.token;

const token = botSettings.token += botSettings.token2 += botSettings.token3 += botSettings.token4;

bot.on("ready", async () => {
    console.log('COVID-19-UPDATE is ready!');

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
    }else if(message.content.startsWith(prefix + 'covid')) {
        let color = message.member.displayHexColor;
        let country = "new-zealand";  // FORMAT
        let cases = 0;
        let recovered = 0;
        let deaths = 0;
        let active = 0;

        let args = message.content;
        let display = message.content;
        display = display.replace(prefix + 'covid ','');

        args = args.replace(prefix + 'covid ','');
        args = args.toLowerCase();
        args = args.replace(' ', '-');
        console.log(args);

        country = args

        let url = "https://api.covid19api.com/summary";

        https.get(url,(res) => {
            let body = "";

            res.on("data", (chunk) => {
                body += chunk;
            });

            res.on("end", () => {
                try {
                    let json2 = JSON.parse(body);
                    let json = json2.Countries;
                    //console.log(json);

                    obj = Object.keys(json).length;

                    for(var i = 0; i < obj; i++){
                        console.log(json[i].Slug);
                        if(json[i].Slug == args){
                            cases = json[i].TotalConfirmed;
                            new_cases = json[i].NewConfirmed;
                            recovered = json[i].TotalRecovered;
                            new_recovered = json[i].NewRecovered;
                            deaths = json[i].TotalDeaths;
                            new_deaths = json[i].NewDeaths;

                            var response = new Discord.MessageEmbed()
                                .setColor(color)
                                .setAuthor('Coronavirus (COVID-19) Cases | ' + json[i].Country, 'https://www.thailandmedical.news/uploads/news/5e6de6608150b_Coronavirus%20Research.jpg') // Optinal link , 'https://discord.js.org'
                                .addFields(
                                    { name: 'Confirmed', value: '**' + cases + "** (+"+ new_cases + ")", inline: true},
                                    { name: 'Recovered', value: '**' + recovered + "** (+"+ new_recovered + ")", inline: true},
                                    { name: 'Deaths', value: '**' + deaths + "** (+"+ new_deaths + ")", inline: true}
                                )
                                .setTimestamp()
                                .setFooter('Data from covid19api.com');

                            
                            message.channel.send(response);
                        }
                    }

                    
                } catch (error) {
                    console.error(error.message);

                    var response = new Discord.MessageEmbed()
                        .setColor(color)
                        .setTitle('A Fatal Error Occured!')
                        .addFields(
                            { name: 'Total Cases', value: cases},
                            { name: 'Inline field title', value: 'Some value here', inline: true },
                            { name: 'Inline field title', value: 'Some value here', inline: true },
                        );
                    
                    message.channel.send(response);
                };
            });

        }).on("error", (error) => {
            console.error(error.message);
        });   
    }else if(message.content.startsWith(prefix + 'help')){
        message.channel.send("```Correct Usage: c.covid your country  |  e.g. c.covid new zealand```");
    }
});

bot.login(token);
// https://discordapp.com/oauth2/authorize?client_id=705614558261280778&scope=bot
