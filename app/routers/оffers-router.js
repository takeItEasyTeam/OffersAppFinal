const { Router } = require('express');
const passport = require('passport');
const { isLogin } = require('../utils/auth-validation');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'OffersApp',
  allowedFormats: ['jpg', 'png'],
});

const upload = multer({ storage: storage }).array('image', 3);

// const upload = multer({ dest: 'static/images' }).array('image', 3);npm install cloudinary

module.exports = function(app, data) {
    const controller = require('../controllers/offers-controller')(data);

    const router = new Router();

    router
        .get('/', controller.getAll)
        .get('/mountain', controller.getByOfferType)
        .get('/sea', controller.getByOfferType)
        .get('/spa', controller.getByOfferType)
        .get('/excursion', controller.getByOfferType)
        .get('/createOffer', isLogin, function(req, res) {
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
        .get('/profile/myOffers', isLogin, controller.getMyOffers)
        .delete('/:id', controller.delete)
        .post('/rate/:id', isLogin, (req, res) => {
            controller.rate(req, res, upload);
        });

    app.use('/', router);
};
