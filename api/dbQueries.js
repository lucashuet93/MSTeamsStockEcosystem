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
    self.loginUser = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.createUser = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.updateUserCapital = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.sellAllShares = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.buyNewShares = (callback) => {
        self.sql.execute({
            query: "SELECT * from Users",
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.updateShares = (callback) => {
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