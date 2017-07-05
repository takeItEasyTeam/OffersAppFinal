const { ObjectID } = require('mongodb');

const getData = (db, models) => {
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
        create(text) {
            const offer = {
                text,
                isDone: false,
            };

            return collection.insert(offer)
                .then((result) => {
                    offer.id = offer._id;
                    return offer;
                });
        },
    };
};

module.exports = { getData };
