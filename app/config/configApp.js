/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const configApp = () => {
    const app = express();

    app.set('view engine', 'pug');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/static', express.static(path.join(__dirname, '../../static')));
    app.use('/libs', express.static(
        path.join(__dirname, '../../node_modules')));
    app.use(cookieParser());
    // app.use(flash());


    // Express Validator Middleware
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));

    return app;
};

module.exports = { configApp };

