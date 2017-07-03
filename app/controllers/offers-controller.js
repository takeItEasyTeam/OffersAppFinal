module.exports = function(data) {
    return {
        create(req, res) {
            const todo = req.body;

            return data.offers.create(todo.text)
                .then((result) => {
                    res.redirect('/');
                });
        },
    };
};
