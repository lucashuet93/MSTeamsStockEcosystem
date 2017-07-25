let restify = require('restify');
let builder = require('botbuilder');
let secrets = require('./secrets');
let stockHelper = require('./stockHelper');
let apiHelper = require('./apiHelper');


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

bot.dialog('/login', [
    (session, args, next) => {
        
    }
])

bot.dialog('/createAccount', [
    (session, args, next) => {
        builder.Prompts.text(session, "Please enter a username")
    },
    (session, results, next) => {
        session.dialogData.username = results.response;
        builder.Prompts.text(session, "Please enter a password")
    },
    (session, results, next) => {
        session.dialogData.password = results.response;
        builder.Prompts.text(session, "Great! What's your first name?")
    },
    (session, results, next) => {
        session.dialogData.firstname = results.response;
        builder.Prompts.text(session, "Last name?")
    },
    (session, results, next) => {
        session.dialogData.lastname = results.response;
        let user = session.dialogData;
        apiHelper.createUser(user.username, user.password, user.firstname, user.lastname)
        session.userData.user = {
            username: user.username,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname
        }
        session.send(`Thanks ${user.firstname}, you're all set to go now!`)
        session.endDialog();
    }
])

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
                let priceHistory = stockHelper.getStockPrice(company)
                    .then((res) => {
                        let priceHistory = res.data['Time Series (1min)']
                        if (!priceHistory) {
                            session.send(`Hmm, it looks like you are trying to find a stock price but I didn't understand the company name/abbreviation. Please try again.`)
                        } else {
                            let priceObject = priceHistory[Object.keys(priceHistory)[0]];
                            let mostRecentPrice = priceObject['4. close']
                            session.send(`${company}'s share price is currently at ${mostRecentPrice}!`);
                        }
                    })
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
        session.beginDialog('/createAccount')
    }
]).triggerAction({
    matches: 'None'
});