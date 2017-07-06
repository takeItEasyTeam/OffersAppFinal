/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const flash = require('connect-flash');

const configApp = () => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/static', express.static(path.join(__dirname, '../../static')));
    app.use('/libs', express.static(
    path.join(__dirname, '../../node_modules')));
    app.use(cookieParser());
    // app.use(flash());

    return app;
};

module.exports = { configApp };

