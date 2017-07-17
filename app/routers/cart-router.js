const { Router } = require('express');
const Cart = require('../model/cart');

module.exports = function(app, data) {
    const controller = require('../controllers/offers-controller')(data);

    const router = new Router();

    router
        .get('/addToCart/:id', function(req, res) {
            const cart = new Cart(req.session.cart ? req.session.cart : {});
                return controller.addOfferToCart(req, res)
                    .then((result) => {
                        cart.add(result.context, result.context.id);
                        req.session.cart = cart;
                        res.redirect('/');
                    });
            
        })
        .get('/shopingCart', function (req, res) {
            if (!req.session.cart) {
                return res.render('shopingCart-view');
            }

            const cart = new Cart(req.session.cart);
            res.render('shopingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice })
        })
        .get('/reduce/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.reduceByOne(productId);
            req.session.cart = cart;
            res.redirect('/shopingCart');
        })
        .get('/remove/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.removeItem(productId);
            req.session.cart = cart;
            res.redirect('/shopingCart');
        })

    app.use('/', router);
};