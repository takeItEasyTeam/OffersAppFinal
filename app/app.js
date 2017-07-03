const { bootstrapApp } = require('./bootstrap');
const { connect } = require('./db');
const { initData } = require('./data');


module.exports = {
    getApp(config) {
        const app = bootstrapApp();

        return Promise.resolve()
            .then(() => connect(config.connectionString))
            .then((db) => {
                const data = initData(db);
                require('./auth')(app, data, 'Purple Unicorn');

                require('./routers')(app, data);

                return app;
            });
    },
};
