module.exports = function(data) {
    return {
        getChat(req, res) {
            return res.render('chat-view');
        },
    };
};
