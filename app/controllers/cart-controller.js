module.exports = function(data) {
    return {
        addOfferToCart(req, res) {
            return data.offers.getById(req.params.id)
                .then((offer) => {
                    if (!offer) {
                        return res.redirect(404, '/offer/all');
                    }

                    return {
                        context: offer,
                    };
                })
                .catch((err) => {
                    return res.redirect(404, '/offer/all');
                });
        },
        createOrder(req, res, cart) {
                const order = req.body;
                order.user = req.user;
                order.userId = req.user.id;
                order.cart = cart;
                order.date = new Date();
                
                return data.cart.createOrder(order)
                .then((result) => {
                    req.session.cart = null;
                    req.flash('success', 'Твоята поръчка е регистрирана успешно');
                    res.redirect('/');
                });
        },
    };
};