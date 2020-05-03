const commando = require('discord.js-commando');
const discord = require('discord.js');

class HelpCommand extends commando.Command
{
	constructor(client)
	{
		super(client,{
			name: 'help2',
			group: 'all',
			memberName: 'help2',
			description: 'reply with help'
		});
	}

	async run(message, args)
	{
        message.channel.send("```Correct Usage: c.covid your country  |  e.g. c.covid new zealand```");
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = HelpCommand;