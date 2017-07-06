const { Router } = require('express');
// const { getController } = require('./controller');
const passport = require('passport');


module.exports = function(app, data) {
    const controller = require('../controllers/user-controller')(data);

    const router = new Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/register', controller.register)
        .post('/login', passport.authenticate('local',
                {
                    successRedirect: '/',
                    failureRedirect: '/login',
                    failureFlash: true,
                })
        )
        .get('/profile', controller.getMyProfile)
        .get('/logout', controller.logout);

    app.use('/', router);
};
