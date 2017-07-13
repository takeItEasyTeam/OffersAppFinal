const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('offers');
    return {
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
                        return offer;
                    });
                });
        },
        edit(offer, query) {
            return collection.updateOne( { _id: new ObjectID(query) }, offer)
                .then((result) => {
                    offer.id = offer._id;
                    return offer;
                });
        },
        delete(offer, query, res) {
            return collection.remove( { _id: new ObjectID(query) })
                .then((result) => {
                    res.send('Success');
                });
        },
        create(offer) {
            return collection.insert(offer)
                .then((result) => {
                    offer.id = offer._id;
                    return offer;
                });
        },
        getOffersByFilter(filter) {
            return collection.find( { city: new RegExp(filter, 'i') })
        .toArray()
        .then((offers) => {
            return offers.map((offer) => {
                offer.id = offer._id;
                    return offer;
                });
            });
        },
    };
};

module.exports = { getData };
