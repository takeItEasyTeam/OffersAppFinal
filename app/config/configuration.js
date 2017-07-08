/* globals process */

const connectionStrings = {
    production: process.env.CONNECTION_STRING, // set node env variable - amazon
    development: 'mongodb://localhost/OffersDB',
};

const environment = process.env.NODE_ENV || 'development';

module.exports = {
    environment: environment,
    connectionString: connectionStrings[environment],
    port: process.env.PORT || 3001,
};
