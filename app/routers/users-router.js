const { Router } = require('express');
// const { getController } = require('./controller');
const passport = require('passport');


module.exports = function(app, data) {
    const controller = require('../controllers/user-controller')(data);

    const router = new Router();

    router
        .get('/', function(req, res){
            res.render('home-view')
        })
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)
        .post('/register', (req, res) => {
                const { username, password } = req.body;
                return data.auth.create(username, password)
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
        



    app.use('/', router);
};
