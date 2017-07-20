/* globals __dirname */

const { configApp } = require('./config/configApp');
const { connect } = require('./db');
const { initData } = require('./data');
const io = require('./config/sockets-config');

module.exports = {
    getApp(connectionString) {
        const app = configApp();

        return Promise.resolve()
            .then(() => connect(connectionString))
            .then((db) => {
                const data = initData(db);
                const server = require('http').Server(app);
                io( { server, data });
                require('./auth')(app, data, db, 'Little secret');

                require('./routers')(app, data, io);

                return { app, server };
            });
    },
};
