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

                const arrayOfItems = Object.keys(cart.items).map(key => {
                    const ar = cart.items[key]

                    // Apppend key if one exists (optional)
                    ar.key = key

                    return ar
                })

                order.user = req.user;
                order.userId = req.user.id;
                order.date = new Date();
                order.items = [];

                arrayOfItems.forEach(function(element) {
                    order.items.push(element);
                }, this);
                //order.cart = arrayOfItems;

                order.price = cart.totalPrice;
                order.quantity = cart.totalQty;
         

                return data.cart.createOrder(order)
                .then((result) => {
                    req.session.cart = null;
                    req.flash('success', 'Твоята поръчка е регистрирана успешно');
                    res.redirect('/');
                });
        },
    };
};
