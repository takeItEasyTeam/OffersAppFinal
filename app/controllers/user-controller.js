const bcrypt = require('bcryptjs');

module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('login-view');
        },
        getRegisterForm(req, res) {
            res.render('register-view');
        },
        register(req, res) {
            /* hash password */
            bcrypt.hash(req.body.password, 10, function(err, hash) {
               const password = hash;
               const username = req.body.username;
               const firstName = req.body.firstName;
               const lastName = req.body.lastName;
               const email = req.body.email;
               const phoneNumber = req.body.phoneNumber;
               const country = req.body.country;
               const town = req.body.town;
               return data.users.create(username, password, firstName, lastName, email, phoneNumber, country, town)
                    .then(() => {
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/login');
                });
            });
        },
        logout(req, res) {
            req.logout();
            req.flash('success', 'You are logged out');
            res.redirect('/');
        },
        getUserProfile(req, res) {
            res.render('profile-view');
        },
        updateUserImage(req, res, upload) {
            upload(req, res, (err) => {
                if (err) {
                    req.flash('error', 'Upload failed!');
                    res.redirect('/profile');
                }
                const userId = req.session.passport.user;
                const image = req.files;

                data.users.updateImage(userId, image)
                .then(() => {
                    res.redirect('/profile');
                });
            });
        },
    };
};
