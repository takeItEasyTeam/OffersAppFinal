const express = require('express');

const bootstrapApp = () => {
    const app = express()

    app.set('view engine', 'pug');

    return app;
}

module.exports = { bootstrapApp };