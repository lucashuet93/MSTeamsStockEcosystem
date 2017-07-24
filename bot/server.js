let restify = require('restify');
let builder = require('botbuilder');
let secrets = require('./secrets');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ChatConnector({
    appId: null,
    appPassword: null
});
let bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

const LUISKey = secrets.LUISKey;