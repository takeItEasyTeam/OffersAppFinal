const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('orders');
    return {
        createOrder(order) {
            return collection.insert(order)
                .then((result) => {
                    return order;
                });
        },
    };
};

module.exports = { getData };
