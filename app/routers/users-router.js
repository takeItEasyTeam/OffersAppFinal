const { Router } = require('express');
// const { getController } = require('./controller');
const passport = require('passport');


module.exports = function(app, data) {
    const controller = require('../controllers/user-controller')(data);

    const router = new Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/register', (req, res) => {
                const { username, password } = req.body;
                return data.users.create(username, password)
                    .then(() => {
                        res.redirect('/login');
                    });
        })
        .post('/login', passport.authenticate('local',
                {
                    successRedirect: '/',
                    failureRedirect: '/login',
                    failureFlash: true,
                })
        )
        .get('/logout', (req, res) => {
                req.logout();
                res.redirect('/');
        });

    app.use('/', router);
};
