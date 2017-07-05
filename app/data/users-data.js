const { ObjectID } = require('mongodb');

const getData = (db, models) => {
    const collection = db.collection('users');
    const User = models.User;

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
        create(username, password) {
            const user = new User(username, password);
            return collection.insert(user)
                .then((result) => {
                    return user;
                });
        },
    };
};

module.exports = { getData };
