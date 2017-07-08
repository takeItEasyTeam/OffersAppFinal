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
                    .then((todo) => {
                        if (!todo) {
                            return null;
                        }

                        todo.id = todo._id;
                        return todo;
                    });
            } catch (err) {
                return Promise.reject('Invalid id');
            }
        },
        getByOfferType(offerType){
            return collection.find({destination: offerType})
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        create(offer) {
            return collection.insert(offer)
                .then((result) => {
                    offer.id = offer._id;
                    return offer;
                });
        },
    };
};

module.exports = { getData };
