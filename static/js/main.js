/* globals $ */

$(document).ready(function() {
    // back to the top
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('myBtn').style.display = 'block';
        } else {
            document.getElementById('myBtn').style.display = 'none';
        }
    }

    $('#myBtn').on('click', function(e) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // test
    $('#btn-add-message').on('click', function(e) {
        $('#message-form').toggleClass('hidden');
        $('#btn-add-message').toggleClass('btn-success');
    });

    $(function() {
        const dateNow = new Date();
        $('#datetimepicker').datetimepicker({
            defaultDate: moment(dateNow)
            .hours(23)
            .minutes(59)
            .seconds(59)
            .milliseconds(0),
        });
        $('#datetimepicker2').datetimepicker({
        });
    });

    const path = window.location.pathname;
    const searchForm = $('#search');

    if (path === '/sea' || path === '/mountain'
        || path === '/spa' || path ==='/excursion'
        || path === '/profile/myOffers') {
        searchForm.attr('action', path + '/search');
    }

    if (path === '/sea/search' || path === '/mountain/search'
        || path === '/spa/search' || path ==='/excursion/search'
        || path === '/profile/myOffers/search') {
        searchForm.attr('action', path);
    }
});
