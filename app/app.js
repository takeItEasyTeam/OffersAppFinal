const { configApp } = require('./config/configApp');
const { connect } = require('./db');
const { initData } = require('./data');


module.exports = {
    getApp(config) {
        const app = configApp();

        return Promise.resolve()
            .then(() => connect(config.connectionString))
            .then((db) => {
                const data = initData(db);
                require('./auth')(app, data, 'Little secret');

                require('./routers')(app, data);

                return app;
            });
    },
};
