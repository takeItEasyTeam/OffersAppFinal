/* globals io $*/

$(document).ready(function() {
    const socket = io.connect('http://localhost:3001');

    const textarea = $('#message');
    const btnSend = $('#btn-chat');
    const container = $('#container');
    const typingDiv = $('#typing');
    socket.on('message', function(data) {
        console.log(data);
        typingDiv.text('');
        const messageContainer = $('<div />');
        messageContainer.addClass('message');
        messageContainer.text(data.text);
        container.append(messageContainer);
    });

    btnSend.on('click', function() {
        const message = {
            text: textarea.val(),
            date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        };
        textarea.val('');
        socket.emit('message', message);
    });

    textarea.on('keyup', function() {
        socket.emit('typing', { socketId: socket.io.engine.id });
    });
    socket.on('typing', function(data) {
        console.log(data);
        typingDiv.text('typing');
    });
});
