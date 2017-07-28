const { Router } = require('express');
const Cart = require('../model/cart');
const { isLogin } = require('../utils/auth-validation');

module.exports = function(app, data) {
    const controller = require('../controllers/cart-controller')(data);

    const router = new Router();

    router
        .get('/', function(req, res) {
            if (!req.session.cart) {
                return res.render('shoppingCart-view');
            }

            const cart = new Cart(req.session.cart);
            return res.render('shoppingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice });
        })
        .get('/add/:id', function(req, res) {
            const cart = new Cart(req.session.cart ? req.session.cart : {});
                return controller.addOfferToCart(req, res)
                    .then((result) => {
                        cart.add(result.context, result.context.id);
                        req.session.cart = cart;
                        const BuyOfferCounter = req.session.cart.totalQty;
                        res.send(JSON.stringify(BuyOfferCounter));
                    });
        })
        .get('/reduce/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.reduceByOne(productId);
            req.session.cart = cart;
            return res.render('partialShopingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice });
        })
        .get('/plus/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.plusByOne(productId);
            req.session.cart = cart;
            return res.render('partialShopingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice });
        })
        .get('/remove/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.removeItem(productId);
            req.session.cart = cart;
            return res.render('partialShopingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice });
        })
        .get('/checkout', isLogin, function(req, res) {
            res.render('checkout-view');
        })
        .get('/deleteCart', function(req, res) {
            req.session.cart = null;
            res.redirect('/shoppingCart');
        })
        .post('/checkout', isLogin, function(req, res) {
            const cart = new Cart(req.session.cart);
            return controller.createOrder(req, res, cart);
        });

    app.use('/shoppingCart', router);
};
