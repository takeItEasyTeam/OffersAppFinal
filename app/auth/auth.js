const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const MongoStore = require('connect-mongo')(session);
const { connect } = require('../db');

module.exports = (app, { users }, db, secret) => {
    passport.use(new Strategy((username, password, done) => {
        users.findBy({ username: username })
            .then((user) => {
                if (!user) {
                    return done(null,
                        false,
                        { message: 'Incorrect username.' });
                }

                /* Hashpassword Match */

                bcrypt.compare(password, user.password, function(err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Wrong password' });
                    }
                });

                // if (user.password !== password) {
                //     return done(null,
                //         false,
                //         { message: 'Incorrect password.' });
                // }

                // return done(null, user);
            });
    }));

    app.use(session({
        secret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ db }),
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
};
