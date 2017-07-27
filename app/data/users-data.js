const { ObjectID } = require('mongodb');

const getData = (db, validator) => {
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
            email, phoneNumber, country, town, userPassword, response) {
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

            user.password = userPassword;
            return validator.validateRegistrationFormFields(user, response)
                .then(() => {
                    user.password = password;
                    return collection.insert(user)
                        .then((result) => {
                            return user;
                        });
                });
        },
        updateImage(id, image) {
            return validator.validateUserImage(image)
                .then(() => {
                    return collection.updateOne({ _id: new ObjectID(id) },
                        { $set: { 'files': image } });
                });
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
