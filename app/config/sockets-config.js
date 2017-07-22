module.exports = function({ server, data }) {
        const io = require('socket.io')(server);
        io.sockets.on('connection', function(socket) {
            console.log('socket id', socket.id);
            socket.on('message', (message) =>{
                console.log(message);
                io.sockets.emit('message', message);
            });
            socket.on('typing', (message) => {
                console.log(message);
                socket.broadcast.emit('typing', message);
            });
        });

        return io;
};
