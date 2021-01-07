'use strict'
const https = require('https');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const bot = new ViberBot({
	authToken: '4caa79373bc00d65-f20c60c75db3e053-75f903f1e36cdd31',
	name: "EchoBot",
	avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const port = 8080;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = 'https://vps41798nl.hyperhost.name/viber/webhook'

const httpsOptions = {
	// key: ...,
	// cert: ...,
	// ca: ...
}; // Trusted SSL certification (not self-signed).
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));