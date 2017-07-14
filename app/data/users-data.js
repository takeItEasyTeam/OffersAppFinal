const { ObjectID } = require('mongodb');


const getData = (db, models) => {
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
        create(username, password, firstName, lastName, email, phoneNumber, country, town) {
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
    };
};
module.exports = { getData };
