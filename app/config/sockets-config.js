module.exports = function({ io, data }) {
        io.sockets.on('connection', function(socket) {
            socket.on('message', (message) =>{

                io.sockets.emit('message', {
                    user: socket.request.user,
                    message: message,
                });
            });
            socket.on('typing', (message) => {
                socket.broadcast.emit('typing', { user: socket.request.user });
            });
        });

        return io;
};
