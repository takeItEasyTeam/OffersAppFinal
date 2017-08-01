const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const MongoStore = require('connect-mongo')(session);
const { connect } = require('../db');
const passportSocketIo = require('passport.socketio');

module.exports = (app, { users }, db, secret, io) => {
    passport.use(new Strategy((username, password, done) => {
        users.findBy({ username: username })
            .then((user) => {
                if (!user) {
                    return done(null,
                        false,
                        { message: 'Няма такъв потребител!' });
                }

                /* Hashpassword Match */

                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                        return done(null, false, { message: 'Wrong password' });
                });

                // if (user.password !== password) {
                //     return done(null,
                //         false,
                //         { message: 'Incorrect password.' });
                // }

                // return done(null, user);
            });
    }));
    const mongoStore = new MongoStore({ db });
    app.use(session({
        secret,
        resave: true,
        saveUninitialized: true,
        store: mongoStore,
        cookie: { maxAge: 180 * 60 * 1000 },
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        users.getById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    /* problem with users and flash messages */
    // app.use((req, res, next) => {
    //     res.locals = {
    //         user: req.user,
    //     };
    //     next();
    // });


    app.use((req, res, next) => {
        res.locals = res.locals || {};
        res.locals.user = req.user;
        res.locals.session = req.session;
        next();
    });

    // socket.io and passport setup

    io.use(passportSocketIo.authorize({
        secret: secret,
        store: mongoStore,
        success: onAuthorizeSuccess,
        fail: onAuthorizeFail,
    }));

    function onAuthorizeSuccess(data, accept) {
        console.log('successful connection to socket.io');

        accept();
    }

    function onAuthorizeFail(data, message, error, accept) {
        if (error) {
            accept(new Error(message));
        }
}
};
