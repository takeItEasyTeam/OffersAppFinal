const { Router } = require('express');
const { isLogin } = require('../utils/auth-validation');

module.exports = function(app, data, io) {
    const controller = require('../controllers/chat-controller')(data);

    const router = new Router();

    router
        .get('/chat', isLogin, controller.getChat);

    app.use('/', router);
};
