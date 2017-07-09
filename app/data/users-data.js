const { ObjectID } = require('mongodb');


const getData = (db, models) => {
    const collection = db.collection('users');
    const offersCollection = db.collection('offers')
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
        getMyProfile(userId) {
            return offersCollection.find({ author: userId })
                .toArray()
                .then((offers) => {
                    return offers.map((offer) => {
                        offer.id = offer._id;
                        return offer;
                    });
                });
        },
        create(username, password) {
            
            const user = {
                username,
                password,
            };            
                        
            return collection.insert(user)
                .then((result) => {
                    return user;
                });
        },
    };
};



module.exports = { getData };
