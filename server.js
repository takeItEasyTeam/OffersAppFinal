const { getApp } = require('./app/app');

const config = require('./app/config/configuration');

getApp({ connectionString: 'mongodb://localhost/OffersDB' })
    .then((app) =>
        app.listen(config.port, () =>
            // eslint-disable-next-line no-console
            console.log(`Magic happens at :${config.port}`)));
