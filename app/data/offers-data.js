const { ObjectID } = require('mongodb');

const getData = (db) => {
    const collection = db.collection('todos');
    return {
        create(text) {
            const todo = {
                text,
                isDone: false,
            };

            return collection.insert(todo)
                .then((result) => {
                    todo.id = todo._id;
                    return todo;
                });
        },
    };
};

module.exports = { getData };
