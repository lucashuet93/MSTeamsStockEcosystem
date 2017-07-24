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
const LUISEndpoint = secrets.LUISEndpoint;

let recognizer = new builder.LuisRecognizer(LUISEndpoint);
bot.recognizer(recognizer);

bot.dialog('/getPrice', [
    (session, args, next) => {
        session.send('You wanted to get price!');
    }
]).triggerAction({
    matches: 'GetPrice'
});

bot.dialog('/buy', [
    (session, args, next) => {
        session.send('You wanted to buy!');
    }
]).triggerAction({
    matches: 'Buy'
});

bot.dialog('/sell', [
    (session, args, next) => {
        session.send('You wanted to sell!');
    }
]).triggerAction({
    matches: 'Sell'
});
