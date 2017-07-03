const { Router } = require('express');
const passport = require('passport');


module.exports = function(app, data) {
    const controller = require('../controllers/offers-controller')(data);

    const router = new Router();

    router
        .get('/', (req, res) => {
                return controller.getAll(req, res);
            })
        .get('/createOffer', function(req, res) {
            res.render('createOffer-view');
        })
        .post('/createOffer', (req, res) => {
                return controller.create(req, res);
        });

    app.use('/', router);
};
