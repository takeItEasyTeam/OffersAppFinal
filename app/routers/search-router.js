const { Router } = require('express');

module.exports = function(app, data) {
    const controller = require('../controllers/search-controller')(data);

    const router = new Router();

    router
        .get('/search', controller.findOffers)
        .get('/sortByPrice', controller.sortByPrice)


    app.use('/', router);
};
