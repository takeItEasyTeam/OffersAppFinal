const { Router } = require('express');
const { isLogin } = require('../utils/auth-validation');

module.exports = function(app, data, validator) {
    const controller = require('../controllers/chat-controller')(data, validator);

    const router = new Router();

    router
        .get('/chat', isLogin, controller.getChat);

    app.use('/', router);
};
