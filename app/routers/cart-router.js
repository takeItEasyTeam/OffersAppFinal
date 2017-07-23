const { Router } = require('express');
const Cart = require('../model/cart');
const { isLogin } = require('../utils/auth-validation');

module.exports = function(app, data) {
    const controller = require('../controllers/cart-controller')(data);

    const router = new Router();

    router
        .get('/addToCart/:id', function(req, res) {
            const cart = new Cart(req.session.cart ? req.session.cart : {});
                return controller.addOfferToCart(req, res)
                    .then((result) => {
                        cart.add(result.context, result.context.id);
                        req.session.cart = cart;
                        const BuyOfferCounter = req.session.cart.totalQty;
                        res.send(JSON.stringify(BuyOfferCounter));
                    });
            
        })
        .get('/shopingCart', function(req, res) {
            if (!req.session.cart) {
                return res.render('shopingCart-view');
            }

            const cart = new Cart(req.session.cart);
            return res.render('shopingCart-view', { products: cart.generateArray(), totalPrice: cart.totalPrice })
        })
        .get('/reduce/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.reduceByOne(productId);
            req.session.cart = cart;
            res.redirect('/shopingCart');
        })
        .get('/plus/:id', function(req, res, next) {
            const productId = req.params.id;
            const cart = new Cart(req.session.cart ? req.session.cart : {});

            cart.plusByOne(productId);
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
        .get('/checkout', isLogin, function(req, res){
            res.render('checkout-view');
        })
        .get('/deleteCart', function(req, res){
            req.session.cart = null;
            res.redirect('/shopingCart');
        })
        .post('/checkout', isLogin, function(req, res) {
            const cart = new Cart(req.session.cart);
            return controller.createOrder(req, res, cart);
        });

    app.use('/', router);
};
