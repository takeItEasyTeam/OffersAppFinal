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
            data.offers.delete(offer, query, res)
        },
        create(req, res) {
            const offer = req.body;
            offer.author = req.user._id;
            return data.offers.create(offer)
                .then((result) => {
                    res.redirect('/');
                });
        },
    };
};
