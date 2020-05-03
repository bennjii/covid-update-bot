const commando = require('discord.js-commando');
const discord = require('discord.js');

class PingCommand extends commando.Command
{
	constructor(client)
	{
		super(client,{
			name: 'ping2',
			group: 'all',
			memberName: 'ping2',
			description: 'Pings the bot'
		});
	}

	async run(message, args)
	{
		let author = message.author.tag;
		startTime = Date.now();

		message.channel.send("Your Ping is...").then((message) => {
			endTime = Date.now();

			let ping = Math.round(endTime - startTime)
			let rounded = ping / 1000

			message.edit(`**pong** :clock10: ${ping}ms | ${rounded} seconds.`)
			console.log('Pinged by' + author + '!')
		});
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = PingCommand;