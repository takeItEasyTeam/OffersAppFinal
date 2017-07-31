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

            const sort = req.body.sorting === 'price' ? 'price' : '_id';
            const order = req.body.order === 'ASC' ? 1 : -1;
            let offerType;
            switch (req.body.path) {
                case '/sea':
                    offerType = { destination: 'Море'};
                    break;
                case '/mountain':
                    offerType = { destination: 'Планина'};
                    break;
                case '/spa':
                    offerType = { destination: 'СПА'};
                    break;
                case '/excursion':
                    offerType = { destination: 'Екскурзия'};
                    break;
                default: offerType = {};
                    break;
            }
            
            return data.offers.sortOffers(sort, order, offerType)
                .then((offers) => {
                     return res.render('partialOffers-view', {
                        context: offers,
                    });
                });
        },
    };
};
