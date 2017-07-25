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
const choicesAsButtons = { listStyle: builder.ListStyle.button }

bot.dialog('/noUser', [
    (session, args, next) => {
        let opts = ['Log In', 'Sign Up']
        builder.Prompts.choice(session, "Let's get you started.", opts, choicesAsButtons)
    },
    (session, results, next) => {
        if (results.response.entity === 'Log In') {
            session.beginDialog('/login')
        } else {
            session.beginDialog('/createAccount')
        }
    },
])

bot.dialog('/login', [
    (session, args, next) => {
        builder.Prompts.text(session, "What's your username?")
    },
    (session, results, next) => {
        session.dialogData.username = results.response;
        builder.Prompts.text(session, "And password?")
    },
    (session, results, next) => {
        apiHelper.loginUser(session.dialogData.username, results.response)
            .then((res) => {
                if (res.data.data.length > 0) {
                    session.userData.user = res.data.data[0]
                    session.send(`Thanks ${session.userData.user.Firstname}, you're all signed in. What can I do for you?`)
                } else {
                    session.send(`Sorry, we were unable to retrieve that username/password combo. Please try again.`)
                    session.replaceDialog('/noUser')
                }
            })

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
            .then((res) => {
                let returnedId = res.data.data;
                session.userData.user = {
                    Id: returnedId,
                    Username: user.username,
                    Password: user.password,
                    Firstname: user.firstname,
                    Lastname: user.lastname,
                    CapitalRemaining: 50000
                }
                session.send(`Thanks ${user.firstname}, you're all set to go now!`)
                session.endDialog();
            })

    }
])

bot.dialog('/getPrice', [
    (session, args, next) => {
        if(!session.userData.user){
            session.send("Hmm I don't have you logged in yet.")
            session.replaceDialog('/login')
        }
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
        if(!session.userData.user){
            session.send("Hmm I don't have you logged in yet.")
            session.replaceDialog('/login')
        }
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
        if(!session.userData.user){
            session.send("Hmm I don't have you logged in yet.")
            session.replaceDialog('/login')
        }
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
        if(!session.userData.user){
            session.send("Hmm I don't have you logged in yet.")
            session.replaceDialog('/login')
        }
        session.send(`Hmm I didn't understand that. Please try again.`);
    }
]).triggerAction({
    matches: 'None'
});