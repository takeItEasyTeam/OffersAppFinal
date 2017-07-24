/* globals __dirname */

const fs = require('fs');
const path = require('path');
const validator = require('../utils/data-validation');

module.exports = function(app, data) {
    fs.readdirSync('./app/routers/')
        .filter((x) => x.includes('-router'))
        .forEach((file) => {
            require(path.join(__dirname, file))(app, data, validator);
        });
};
