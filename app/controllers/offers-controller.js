module.exports = function (data) {
    return {
        getAll(req, res) {
            return data.offers.getAll()
                .then((offers) => {
                    return res.render('allOffers-view', {
                        context: offers,
                    });
                });
        },
        getByOfferType(req, res) {
            let offerType;

            switch (req.path) {
                case '/see':
                    offerType = 'Море'
                    break;
                case '/mountain':
                    offerType = 'Планина'
                    break;
                case '/spa':
                    offerType = 'СПА'
                    break;
                case '/excursion':
                    offerType = 'Екскурзия'
                    break;
                default: break
            }

            return data.offers.getByOfferType(offerType)
                .then((offers) => {
                    return res.render('allOffers-view', {
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
