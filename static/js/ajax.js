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
    $(document).on('click', '.buy', function(e) {
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
    $(document).on('click', '.plus', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/plus/' + id,
            success: function(response) {
                $('.main').html(response);
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $(document).on('click', '.remove', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/remove/' + id,
            success: function(response) {
                $('.main').html(response);
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $(document).on('click','.reduce', function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/shoppingCart/reduce/' + id,
            success: function(response) {
                $('.main').html(response);
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
    $(document).on('click','#filter', function(e) {
        const sorting = $('.sorting').val();
        const order = $('.order').val();
        
        const data = {
            sorting,
            order,
            path: window.location.pathname,
        }
        $.ajax({
            type: 'POST',
            url: '/sort',
            data: data,
            success: function(response) {
                $('.main').html(response);
            },
            error: function(err) {
                console.log(err);
            },
        });
    });
});
