/* globals process */

const port = process.env.PORT || 3001;
const connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: 'mongodb://localhost/OffersDB',
};

    // 'mongodb://localhost/OffersDB', // local usage
    // 'mongodb://mongo:27017/', // Docker usage
    // 'mongodb://35.158.233.58:27017/', // AWS usage

module.exports = {
    connectionString: connectionStrings[process.env.NODE_ENV || 'development'],
    port,
};
