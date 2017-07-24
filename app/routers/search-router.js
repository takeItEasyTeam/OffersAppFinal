const { Router } = require('express');

module.exports = function(app, data, validator) {
    const controller = require('../controllers/search-controller')(data, validator);

    const router = new Router();

    router
        .get('/search', controller.findOffers)
        .post('/sort', controller.sortOffers);

    app.use('/', router);
};
