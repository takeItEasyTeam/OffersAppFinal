/* globals __dirname */

const { configApp } = require('./config/configApp');
const { connect } = require('./db');
const { initData } = require('./data');
const socketConfig = require('./config/sockets-config');

module.exports = {
    getApp(connectionString) {
        const app = configApp();

        return Promise.resolve()
            .then(() => connect(connectionString))
            .then((db) => {
                const data = initData(db);
                const server = require('http').Server(app);
                const io = require('socket.io')(server);

                require('./auth')(app, data, db, 'Little secret', io);

                socketConfig( { io, data });
                require('./routers')(app, data);

                return { app, server };
            });
    },
};
