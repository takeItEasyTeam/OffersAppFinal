module.exports = function(data) {
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
                    offerType = 'Море';
                    break;
                case '/mountain':
                    offerType = 'Планина';
                    break;
                case '/spa':
                    offerType = 'СПА';
                    break;
                case '/excursion':
                    offerType = 'Екскурзия';
                    break;
                default: break;
            }

            return data.offers.getByOfferType(offerType)
                .then((offers) => {
                    return res.render('allOffers-view', {
                        context: offers,
                    });
                });
        },
        getOfferDetails(req, res) {
            return data.offers.getById(req.params.id)
                .then((offer) => {
                    if (!offer) {
                        return res.redirect(404, '/offer/all');
                    }

                    return res.render('offerDetails-view', {
                        context: offer,
                    });
                })
                .catch((err) => {
                    return res.redirect(404, '/offer/all');
                });
        },
        getMyOffers(req, res) {
            const userId = req.user._id;

            return data.offers.getMyOffers(userId)
                .then((offers) => {
                    return res.render('myOffers-view', {
                        context: offers,
                    });
                });
        },
        getOfferEdit(req, res) {
            return data.offers.getById(req.params.id)
                .then((offer) => {
                    if (!offer) {
                        return res.redirect(404, '/offer/all');
                    }

                    return res.render('editOffer-view', {
                        context: offer,
                    });
                })
                .catch((err) => {
                    return res.redirect(404, '/offer/all');
                });
        },
        edit(req, res) {
            const offer = req.body;
            offer.author = req.user._id;
            const query = req.params.id;
            return data.offers.edit(offer, query)
                .then((result) => {
                    res.redirect('/');
                });
        },
        delete(req, res) {
            const offer = req.body;
            offer.author = req.user._id;
            const query = req.params.id;
            data.offers.delete(offer, query, res);
        },
        create(req, res, upload) {
            upload(req, res, (err) => {
                if (err) {
                    req.flash('error', 'You can upload only 3 pictures!');
                    res.redirect('/createOffer');
                }
                const offer = req.body;
                offer.files = req.files;
                offer.author = req.user._id;
                return data.offers.create(offer)
                .then((result) => {
                res.redirect('/');
                });
            });
        },
    };
};
