const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('users');
    return {
        findBy(props) {
            return collection.findOne(props);
        },
        getById(id) {
            return collection.findOne({ _id: new ObjectID(id) })
                .then((user) => {
                    if (!user) {
                        return null;
                    }

                    user.id = user._id;
                    return user;
                });
        },
        create(username, password, firstName, lastName,
            email, phoneNumber, country, town) {
            const user = {
                username,
                password,
                firstName,
                lastName,
                email,
                phoneNumber,
                country,
                town,
            };
            return collection.insert(user)
                .then((result) => {
                    return user;
                });
        },
        updateImage(id, image) {
            return collection.updateOne({ _id: new ObjectID(id) },
                { $set: { 'files': image } });
        },
        getMyOrders(userId) {
            return db.collection('orders').find({ userId: userId })
                .toArray()
                .then((orders) => {
                    return orders.map((order) => {
                        order.id = order._id;
                        return order;
                    });
                });
        },
    };
};
module.exports = { getData };
