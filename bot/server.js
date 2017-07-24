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
        if (companyEntityObject === null) {
            session.beginDialog('/none')
        } else {
            let company = companyEntityObject.entity
            if (company === null) {
                session.send(`Hmm, it looks like you are trying to find a stock price but I didn't understand the company name/abbreviation. Please try again.`)
            } else {
                session.send(`You wanted to know ${company}'s share price!`);
            }
        }
    }
]).triggerAction({
    matches: 'GetPrice'
});


bot.dialog('/buy', [
    (session, args, next) => {
        let companyEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'Company');
        let amountEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.number');
        if (companyEntityObject === null) {
            session.beginDialog('/none')
        } else {
            if (amountEntityObject === null) {
                session.send(`Hmm, it looks like you are trying to buy stock but I didn't understand. Please try again.`)
            }
            let company = companyEntityObject.entity
            let amount = amountEntityObject.entity
            if (company === null || amount === null) {                
                session.send(`Hmm, it looks like you are trying to buy stock but I didn't understand. Please try again.`)
            } else {
                session.send(`You wanted to buy ${amount} shares of ${company}!`);
            }
        }
    }
]).triggerAction({
    matches: 'Buy'
});

bot.dialog('/sell', [
    (session, args, next) => {
        let companyEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'Company');
        let amountEntityObject = builder.EntityRecognizer.findEntity(args.intent.entities, 'builtin.number');
        if (companyEntityObject === null) {
            session.beginDialog('/none')
        } else {
            if (amountEntityObject === null) {
                session.send(`Hmm, it looks like you are trying to sell stock but I didn't understand. Please try again.`)
            }
            let company = companyEntityObject.entity
            let amount = amountEntityObject.entity
            if (company === null || amount === null) {                
                session.send(`Hmm, it looks like you are trying to sell stock but I didn't understand. Please try again.`)
            } else {
                session.send(`You wanted to sell ${amount} shares of ${company}!`);
            }
        }
    }
]).triggerAction({
    matches: 'Sell'
});

bot.dialog('/none', [
    (session, args, next) => {
        session.send(`Hmm I didn't understand that. Please try again.`);
    }
]).triggerAction({
    matches: 'None'
});