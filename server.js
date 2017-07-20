const { getApp } = require('./app/app');

const config = require('./app/config/configuration');

getApp(config.connectionString)
    .then((app) => {
        app.server.listen(config.port, () => {
            // eslint-disable-next-line no-console
            console.log(`Magic happens at :${config.port}`);
        });
    });
