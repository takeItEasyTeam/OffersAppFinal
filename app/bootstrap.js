const express = require('express');

const bootstrapApp = () => {
    const app = express()


    return app;
}

module.exports = { bootstrapApp };