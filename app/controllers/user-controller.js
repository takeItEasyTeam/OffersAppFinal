const bcrypt = require('bcryptjs');

module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('login-view');
        },
        getRegisterForm(req, res) {
            res.render('register-view');
        },
        getMyProfile(req, res) {
            const userId = req.user._id;

            return data.users.getMyProfile(userId)
                .then((offers) => {
                    return res.render('profile-view', {
                        context: offers,
                    });
                });
        },
        register(req, res) {
            /* hash password */
            bcrypt.hash(req.body.password, 10, function(err, hash) {
               const password = hash;
               const username = req.body.username;
               return data.users.create(username, password)
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
    };
};
