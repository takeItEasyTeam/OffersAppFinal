const { Router } = require('express');
// const { getController } = require('./controller');
const passport = require('passport');
const { ensureAuthenticated, frontRegisterUserValidation } = require('../utils/auth-validation');

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
        .get('/profile', ensureAuthenticated, function(req, res){
            res.render('profile-view');
        })
        .get('/logout', controller.logout);

    app.use('/', router);
};
