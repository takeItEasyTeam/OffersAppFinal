module.exports = function({ server, data }) {
        const io = require('socket.io')(server);
        io.on('connection', function(socket) {
            console.log('socket id', socket.id);
        });
        return io;
};
