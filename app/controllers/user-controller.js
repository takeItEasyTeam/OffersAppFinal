module.exports = function(data) {
    return {
        getLoginForm(req, res) {
            res.render('login-view');
        },
        getRegisterForm(req, res) {
            res.render('register-view');
        },
        getMyProfile(req, res){
            res.render('profile-view')
        },
        register(req, res) {
            const { username, password } = req.body;
                return data.users.create(username, password)
                    .then(() => {
                        res.redirect('/login');
                    });
        },
        logout(req, res) {
            req.logout();
            res.redirect('/');
        },
    };
};
