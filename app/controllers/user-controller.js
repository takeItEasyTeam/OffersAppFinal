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
            const user = req.body;
            const username = req.body.username;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const phoneNumber = req.body.phoneNumber;
            const country = req.body.country;
            const town = req.body.town;
            return data.users.findBy( { 'username': req.body.username })
                .then((response) => {
                    /* hash password */
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        const userPassword = req.body.password;
                        const password = hash;
                            return data.users.create(username, password, firstName, lastName, email, phoneNumber, country, town, userPassword, response)
                                .then(() => {
                                    req.flash('success', 'Потребителят е регистриран успешно!');
                                    res.redirect('/login');
                                })
                                .catch((error) => {
                                    req.flash('error', error);
                                    res.redirect('/register');
                                });
                    });
                })
                .catch((error) => {
                    req.flash('error', error);
                    res.redirect('/register');
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
                    req.flash('error', 'Грешка при качването на снимката');
                    res.redirect('/profile');
                }
                const userId = req.session.passport.user;
                const image = req.files;

                return data.users.updateImage(userId, image)
                        .then(() => {
                            res.redirect('/profile');
                        })
                        .catch((error) => {
                            console.log(error);
                            req.flash('error', error);
                            res.redirect('/profile');
                        });
            });
        },
        getMyOrders(req, res) {
            const userId = req.user._id;

            return data.users.getMyOrders(userId)
                .then((orders) => {
                    return res.render('myOrders-view', {
                        context: orders,
                    });
                });
        },
    };
};
