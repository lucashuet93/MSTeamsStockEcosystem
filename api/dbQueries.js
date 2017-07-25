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
    self.generateGUID = () => {
        let d = new Date().getTime();
        let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (char == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    }
    self.loginUser = (username, password, callback) => {
        self.sql.execute({
            query: "SELECT * from Users WHERE username = @username and password = @password",
            params: {
                username: {
                    type: self.sql.nvarchar,
                    val: username,
                },
                password: {
                    type: self.sql.nvarchar,
                    val: password,
                },
            }
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.createUser = (body, callback) => {
        let guid = self.generateGUID()
        self.sql.execute({
            query: "INSERT INTO Users VALUES (@guid, @firstname, @lastname, @username, @password, 50000)",
            params: {
                guid: {
                    type: self.sql.uniqueidentifier,
                    val: guid,
                },
                username: {
                    type: self.sql.nvarchar,
                    val: body.username,
                },
                password: {
                    type: self.sql.nvarchar,
                    val: body.password,
                },
                firstname: {
                    type: self.sql.nvarchar,
                    val: body.firstname,
                },
                lastname: {
                    type: self.sql.nvarchar,
                    val: body.lastname,
                },
            }
        }).then(function (res) {
            callback(res);
        }, function (err) {
            console.log("Something bad happened:", err);
        });
    };
    self.updateUserCapital = (body, callback) => {
        self.sql.execute({
            query: "UPDATE Users SET CapitalRemaining = @newAmount WHERE Id = @userId",
            params: {
                userId: {
                    type: self.sql.uniqueidentifier,
                    val: body.userId,
                },
                newAmount: {
                    type: self.sql.nvarchar,
                    val: body.newAmount,
                },
            }
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