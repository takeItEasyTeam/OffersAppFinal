module.exports = function(data, validator) {
    return {
        findOffers(req, res) {
            const filter = req.query.city;
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
                    return res.send( { context: offers } );
                });
        },
    };
};
