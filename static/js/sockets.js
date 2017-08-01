/* globals io $*/

$(document).ready(function() {
    const socket = io.connect('http://localhost:3001');
    // const socket = io.connect('http://35.158.65.13:3001/'); for AWS

    const textarea = $('#message');
    const btnSend = $('#btn-chat');
    const typingDiv = $('#typing');
    const messagesList = $('#messages');

    socket.on('message', function(data) {
        typingDiv.text('');

        const messageLi = $('<li />');
        const spanImg = $('<span />');
        const strong = $('<strong />');
        const small = $('<small />');
        const spanTime = $('<span />');

        if (data.message.socketId !== socket.io.engine.id) {
            messageLi.addClass('left clearfix');
            spanImg.addClass('chat-img pull-left');
            strong.addClass('primary-font');
            small.addClass('pull-right text-muted');
        } else {
            messageLi.addClass('right clearfix');
            strong.addClass('pull-right primary-font');
            spanImg.addClass('chat-img pull-right');
            small.addClass('text-muted');
        }

        spanTime.addClass('glyphicon glyphicon-time');
        strong.text(data.user.username);
        spanTime.text(data.message.date);

        const img = $('<img />');
        img.addClass('img-circle');
        img.addClass('img-responsive');
        img.addClass('img-chat');
        img.attr('alt', 'User Avatar');
        if (data.user.files && data.user.files.length !== 0) {
            img.attr('src', data.user.files[0].path);
        } else {
            img.attr('src', '/static/images/users/avatar.png');
        }


        const divChatBody = $('<div />');
        divChatBody.addClass('chat-body clearfix');
        const divHeader = $('<div />');
        divHeader.addClass('header');

        const messageParagraph = $('<p />');
        messageParagraph.text(data.message.text);
        small.append(spanTime);

        if (data.message.socketId !== socket.io.engine.id) {
        divHeader.append(small);
        divHeader.append(strong);
        } else {
        divHeader.append(strong);
        divHeader.append(small);
        }

        divChatBody.append(divHeader);
        divChatBody.append(messageParagraph);
        spanImg.append(img);
        messageLi.append(spanImg);
        messageLi.append(divChatBody);
        messagesList.append(messageLi);
    });

    btnSend.on('click', function() {
        const message = {
            text: textarea.val(),
            date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            socketId: socket.io.engine.id,
        };
        textarea.val('');
        socket.emit('message', message);
    });

    textarea.on('keyup', function() {
        socket.emit('typing', { socketId: socket.io.engine.id });
    });
    socket.on('typing', function(data) {
        typingDiv.text(data.user.username + ' ' + 'typing');
    });
});

