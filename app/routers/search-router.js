const { Router } = require('express');

module.exports = function(app, data, validator) {
    const controller = require('../controllers/search-controller')(data, validator);

    const router = new Router();

    router
        .get('/search', controller.findOffers)
        .get('/sea/search', controller.findOffers)
        .get('/mountain/search', controller.findOffers)
        .get('/spa/search', controller.findOffers)
        .get('/excursion/search', controller.findOffers)
        .get('/profile/myOffers/search', controller.findOffers)
        .post('/sort', controller.sortOffers);

    app.use('/', router);
};
