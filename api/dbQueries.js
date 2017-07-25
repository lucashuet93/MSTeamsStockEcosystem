"use strict";
let secrets = require('./secrets');
let dbQueriesContainer = function () {
    let self = this;
    self.sql = require('seriate');
    self.axios = require('axios')
    self.sql.setDefaultConfig({
        user: secrets.User,
        password: secrets.Password,
        host: secrets.Host,
        database: secrets.Database,
        options: {
            encrypt: true
        }
    });
    self.getUsers = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
};
module.exports = new dbQueriesContainer();