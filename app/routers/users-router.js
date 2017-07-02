const { Router } = require('express');
// const { getController } = require('./controller');

module.exports = function(app, data) {
    const controller = require('../controllers/user-controller')(data);

    const router = new Router();

    router
        .get('/login', controller.getLoginForm)
        .get('/register', controller.getRegisterForm)

    app.use('/', router);
};
