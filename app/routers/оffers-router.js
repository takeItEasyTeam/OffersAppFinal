const { Router } = require('express');
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth-validation');
const multer = require('multer');
const upload = multer({ dest: 'static/images' }).array('image', 3);

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
        .get('/edit/:id', controller.getOfferEdit)
        .post('/edit/:id', (req, res) => {
            controller.edit(req, res, upload);
        })
        .post('/createOffer', (req, res) => {
            controller.create(req, res, upload);
        })
        .get('/profile/myOffers', ensureAuthenticated, controller.getMyOffers)
        .delete('/:id', controller.delete);

    app.use('/', router);
};
