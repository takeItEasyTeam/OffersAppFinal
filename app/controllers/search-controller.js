module.exports = function(data) {
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
        sortByPrice(req, res){
            return data.offers.getAll()
                .then((offers) => {
                    return res.send(JSON.stringify({context: offers }));
                });
        }
    };
};
