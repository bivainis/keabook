// todo:
// create and init auth module
// validate inputs
// if not logged in then show home page
// maybe realtime chat?
// ajax content requests
// search

$(function() {
    var wHeight = window.innerHeight,
        navHeight = $('.navbar-header').height() + 1; // +1px to account for border

    $('main, main > .container').height(wHeight - navHeight);

    $('[data-open]').on('click', function(){

        var target = $(this).attr('data-open'),
            popup = $('.popup');

        popup.hide().children().hide();
        $('#' + target).show();
        popup.show();


    });
});

