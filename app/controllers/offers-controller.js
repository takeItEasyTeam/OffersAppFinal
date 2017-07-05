module.exports = function(data) {
    return {
        getAll(req, res) {
            return data.offers.getAll()
                .then((offers) => {
                    return res.render('home-view', {
                        context: offers,
                    });
                });
        },
        create(req, res) {
            const offer = req.body;

            return data.offers.create(offer)
                .then((result) => {
                    res.redirect('/');
                });
        },
    };
};
