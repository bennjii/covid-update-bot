const commando = require('discord.js-commando');
const Discord = require('discord.js');
const https = require('https');
const botSettings = require("../../botsettings.json");
const prefix = botSettings.prefix;

class CovidCommand extends commando.Command
{
	constructor(client)
	{
		super(client,{
			name: 'covid',
			group: 'all',
			memberName: 'covid',
			description: 'Corrona Virus Reponse Request for data'
		});
	}

	async run(message, args)
	{
        console.log("RAN");
		let color = message.member.displayHexColor;
        let country = "new-zealand";  // FORMAT

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

                    let obj = Object.keys(json).length;

                    for(var i = 0; i < obj; i++){
                        //console.log(json[i].Slug);
                        if(json[i].Slug == args){
                            let cases = json[i].TotalConfirmed;
                            let new_cases = json[i].NewConfirmed;
                            let recovered = json[i].TotalRecovered;
                            let new_recovered = json[i].NewRecovered;
                            let deaths = json[i].TotalDeaths;
                            let new_deaths = json[i].NewDeaths;

                            var response = new Discord.MessageEmbed()
                                .setColor(color)
                                .setAuthor('Coronavirus (COVID-19) Cases | ' + json[i].Country, 'https://raw.githubusercontent.com/UnRealReincarlution/COVID-UPDATE/master/resources/assets/logo.png?token=AI2K5ZZNFX4TE4GC6POTQOK6VUTQE') // Optinal link , 'https://discord.js.org'
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
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = CovidCommand;