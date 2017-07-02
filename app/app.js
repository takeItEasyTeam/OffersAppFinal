const { bootstrapApp } = require('./bootstrap');
const { connect } = require('./db');

module.exports = {
    getApp(config){
        const app = bootstrapApp();

        return Promise.resolve()
            .then(() => connect(config.connectionString))
            .then((db) => {
                // const data = initData(db);

                // require('./auth')(app, data, 'Purple Unicorn');

                // routers.attachTo(app, data);

                return app;
            });
    }
    

}