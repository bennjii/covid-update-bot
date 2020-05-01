const botSettings = require("./BotSettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const hook = new Discord.WebhookClient('webhook id', 'webhook token');
const bot = new Discord.Client({disableEveryone: true});

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

bot.login(botSettings.token);
// https://discordapp.com/oauth2/authorize?client_id=705614558261280778&scope=bot