module.exports = function(data, validator) {
    return {
        getChat(req, res) {
            return res.render('chat-view');
        },
    };
};
