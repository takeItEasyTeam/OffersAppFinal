/* globals $ */

$(document).ready(function() {
    $('.delete-offer').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/' + id,
            success: function(response) {
                window.location.href = '/profile/myOffers';
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $('.buy').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/add/' + id,
            success: function(response) {
                $('.badge').html(response);
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $('.plus').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/plus/' + id,
            success: function(response) {
                window.location.href = '/shoppingCart';
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $('.remove').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/remove/' + id,
            success: function(response) {
                window.location.href = '/shoppingCart';
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $('.reduce').on('click', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/reduce/' + id,
            success: function(response) {
                window.location.href = '/shoppingCart';
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
});
