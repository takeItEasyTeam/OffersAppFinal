module.exports = function(data) {
    return {
        findOffers(req, res) {
            const url = req.route.path;
            let offerType;
            let author;
            if (url === '/sea' || url === '/sea/search') {
                offerType = 'Море';
            } else if (url === '/mountain' || url === '/mountain/search') {
                offerType = 'Планина';
            } else if (url === '/spa' || url === '/spa/search') {
                offerType = 'СПА';
            } else if (url === '/excursion' || url === '/excursion/search') {
                offerType = 'Екскурзия';
            } else if (url === '/profile/myOffers' || url === '/profile/myOffers/search') {
                author = req.user._id;
            }
            let filter;
            const city = req.query.city;

            if (offerType !== undefined) {
                filter = { destination: offerType, city: city };
            } else if (author !== undefined) {
                filter = { author: author, city: city };
            } else {
                filter = { city: city };
            }
            return data.offers.getOffersByFilter(filter)
                .then((offers) => {
                    return res.render('allOffers-view', {
                        context: offers,
                    });
                });
        },
        sortOffers(req, res) {
            console.log(req.query.priceHight);
            let offerType;

            switch (req.body.path) {
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
                default: offerType = 'None';
                    break;
            }
            console.log(offerType);
            const order = Number(req.body.order);
            return data.offers.sortOffers(order, offerType)
                .then((offers) => {
                    return res.send({ context: offers });
                });
        },
    };
};
