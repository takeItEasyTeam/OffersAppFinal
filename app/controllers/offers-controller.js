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
                case '/sea':
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
        edit(req, res, upload) {
            upload(req, res, (err) => {
                if (err) {
                    req.flash('error', 'Може да качите само до 3 снимки!');
                    res.redirect('/createOffer');
                }
                const updates = {};
                const query = req.params.id;

                if (req.body.destination !== '') {
                    updates.destination = req.body.destination;
                }
                if (req.body.city.trim() !== '') {
                    updates.city = req.body.city.trim();
                }
                if (req.body.validity.trim() !== '') {
                    updates.validity = req.body.validity.trim();
                }
                if (req.body.price.trim() !== '') {
                    updates.price = Number(req.body.price);
                }
                if ( req.files.length !== 0) {
                    updates.files = req.files;
                }

                const offerId = req.params.id;

                return data.offers.edit(updates, query)
                    .then((result) => {
                        res.redirect('/');
                    })
                    .catch((error) => {
                        req.flash('error',
                         'Моля въведете информация за промяна!');
                        res.redirect('/edit/' + offerId);
                    });
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
                    req.flash('error', 'Може да качите само до 3 снимки!');
                    res.redirect('/createOffer');
                }
                const offer = req.body;

                offer.price = Number(offer.price);
                offer.files = req.files;
                offer.author = req.user._id;
                offer.comments = [];
                return data.offers.create(offer)
                        .then((result) => {
                            res.redirect('/');
                        })
                        .catch((error) => {
                            req.flash('error', error);
                            res.redirect('/createOffer');
                        });
            });
        },
        rate(req, res, upload) {
            upload(req, res, (err) => {
                const comment = {};
                const query = req.params.id;

                if (req.body.message.trim() !== '') {
                    comment.text = req.body.message.trim();
                }
                comment.date = new Date();
                comment.user = req.user._id;
                comment.userName = req.user.username;
                comment.rate = Number(req.body.rating);

                return data.offers.rate(comment, query)
                    .then((result) => {
                        res.redirect('/');
                    })
                    .catch((error) => {
                        req.flash('error', 'Моля въведете коментар');
                    });
            });
        },
    };
};
