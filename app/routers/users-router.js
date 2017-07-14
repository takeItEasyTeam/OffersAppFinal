const { Router } = require('express');
// const { getController } = require('./controller');
const passport = require('passport');
const { ensureAuthenticated, frontRegisterUserValidation } = require('../utils/auth-validation');
const multer = require('multer');
const upload = multer({ dest: 'static/images/users' }).array('image', 1);

module.exports = function(app, data) {
    const controller = require('../controllers/user-controller')(data);

    const router = new Router();

    router
        // .get('/', function (req, res) {
        //     res.render('home-view')
        // })
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/register', frontRegisterUserValidation, controller.register)
        .post('/login', passport.authenticate('local',
            {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })
        )
        .get('/profile', ensureAuthenticated, controller.getUserProfile)
        .post('/profile', (req, res) => {
                controller.updateUserImage(req, res, upload);
        })
        .get('/logout', controller.logout);

    app.use('/', router);
};
