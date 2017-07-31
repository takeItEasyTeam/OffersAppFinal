/* globals process */

const port = 3001;
const connectionString = 'mongodb://localhost/OffersDB';
    // 'mongodb://localhost/OffersDB', // local usage
    // 'mongodb://mongo:27017/', // Docker usage
    // 'mongodb://35.158.233.58:27017/', // AWS usage

module.exports = { connectionString, port };
