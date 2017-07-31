const { ObjectID } = require('mongodb');

const getData = (db, validator) => {
    const collection = db.collection('offers');
    const orders = db.collection('orders');

    function getOfferCount(id) {
        return 42;
    }
    return {
        getOfferCount(id) {
            return 42;
        },
        getAll() {
            return collection.find({})
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        getById(id) {
            try {
                return collection.findOne({ _id: new ObjectID(id) })
                    .then((offer) => {
                        if (!offer) {
                            return null;
                        }

                        offer.id = offer._id;
                        return offer;
                    });
            } catch (err) {
                return Promise.reject('Invalid id');
            }
        },
        getByOfferType(offerType) {
            return collection.find({ destination: offerType })
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        getMyOffers(userId) {
            return collection.find({ author: userId })
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        offer.count = getOfferCount(offer._id);
                        return offer;
                    });
                });
        },
        edit(updates, query) {
            return collection.updateOne({ _id: new ObjectID(query) },
                { $set: updates });
        },
        delete(offer, query, res) {
            return collection.remove({ _id: new ObjectID(query) })
                .then((result) => {
                    res.send('Success');
                });
        },
        create(offer) {
            return validator.validateCreateNewOfferForm(offer)
                .then(() => {
                    return collection.insert(offer)
                        .then((result) => {
                        return offer;
                    });
                });
        },
        getOffersByFilter(filter) {
             if (filter.author) {
                filter.author = new ObjectID(filter.author);
            }
            filter.city = new RegExp(filter.city, 'i');
            return collection.find(filter)
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        sortOffers(sorting, order, offerType) {
            console.log(offerType);
            const filter = {};
            filter[sorting] = order;
            return collection.find(offerType)
                .sort(filter)
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        rate(comment, query) {
            return collection.updateOne({ _id: new ObjectID(query) },
                { $push: { 'comments': comment } });
        },
    };
};

module.exports = { getData };
