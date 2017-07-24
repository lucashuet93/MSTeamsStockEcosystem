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
        let companyEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'Company');
        let company = companyEntityObject.entity ? companyEntityObject.entity : "Not Found";
        session.send(`You wanted to know ${company}'s share price!`);
    }
]).triggerAction({
    matches: 'GetPrice'
});

bot.dialog('/help', [
    (session, args, next) => {
        session.send(`No intent!`);
    }
]).triggerAction({
    matches: 'None'
});

bot.dialog('/buy', [
    (session, args, next) => {
        let amountEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.number');
        let companyEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'Company');     
        let amount = amountEntityObject.entity ? amountEntityObject.entity : "Not Found";
        let company = companyEntityObject.entity ? companyEntityObject.entity : "Not Found";
        session.send(`You wanted to buy ${amount} shares of ${company}!`);
    }
]).triggerAction({
    matches: 'Buy'
});

bot.dialog('/sell', [
    (session, args, next) => {
        let amountEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.number');
        let companyEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'Company');
        let amount = amountEntityObject.entity ? amountEntityObject.entity : "Not Found";
        let company = companyEntityObject.entity ? companyEntityObject.entity : "Not Found";
        session.send(`You wanted to sell ${amount} shares of ${company}!`);
    }
]).triggerAction({
    matches: 'Sell'
});
