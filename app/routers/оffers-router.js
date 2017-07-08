const { Router } = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth-validation')

module.exports = function(app, data) {
    const controller = require('../controllers/offers-controller')(data);

    const router = new Router();

    router
        .get('/', controller.getAll)
        .get('/mountain', controller.getByOfferType)
        .get('/see', controller.getByOfferType)
        
        .get('/spa', controller.getByOfferType)
        .get('/excursion', controller.getByOfferType)
        .get('/createOffer', ensureAuthenticated, function(req, res) {
            res.render('createOffer-view');
        })
        .get('/:id', controller.getOfferDetails)
        .post('/createOffer', controller.create);

    app.use('/', router);
};
