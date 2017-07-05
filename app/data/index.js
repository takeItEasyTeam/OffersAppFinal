/* globals __dirname */

const fs = require('fs');
const path = require('path');

const User = require('../models/user-model');

const models = {
    User,
};

const initData = (db) => {
    const data = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('-data'))
        .forEach((file) => {
            const dataName = file.substr(0, file.indexOf('-data'));
            const dataModulePath = path.join(__dirname, file);
            data[dataName] = require(dataModulePath).getData(db, models);
        });

    return data;
};

module.exports = { initData };
