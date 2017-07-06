const { Router } = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth-validation')

module.exports = function(app, data) {
    const controller = require('../controllers/offers-controller')(data);

    const router = new Router();

    router
        .get('/', controller.getAll)
        .get('/mountain', function(req, res) {
            res.render('mountain-view');
        })
        .get('/see', function(req, res) {
            res.render('see-view');
        })
        .get('/spa', function(req, res) {
            res.render('spa-view');
        })
        .get('/excursion', function(req, res) {
            res.render('excursion-view');
        })
        .get('/createOffer', ensureAuthenticated, function(req, res) {
            res.render('createOffer-view');
        })
        .post('/createOffer', controller.create);

    app.use('/', router);
};
