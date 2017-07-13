const { Router } = require('express');

module.exports = function(app, data) {
    const controller = require('../controllers/search-controller')(data);

    const router = new Router();

    router
        .get('/search', controller.findOffers);


    app.use('/', router);
};
