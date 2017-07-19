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
                const order = {
                    user: req.user._id,
                    cart: cart,
                };
                
                return data.cart.createOrder(order)
                .then((result) => {
                    req.session.cart = null;
                    req.flash('success', 'Твоята поръчка е регистрирана успешно');
                    res.redirect('/');
                });
        },
    };
};