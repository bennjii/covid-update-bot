const Commando = require('discord.js-commando');
const client = new Commando.Client();
const botSettings = require("./botsettings.json");
const token = botSettings.token += botSettings.token2 += botSettings.token3 += botSettings.token4;

client.registry.registerGroup('all', 'All');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + '/commands');

client.on('message', function(message){
	if(message.content == 'Hey Bots')
	{
		message.channel.sendMessage('Hello '+ message.author + ', How are you doing today?');
	}
}); 

client.on('ready', function() {
	console.log('Ready!')
	client.user.setActivity('The World', { type: 'WATCHING' });
})

client.login(token);
