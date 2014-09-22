// pseudo

// login
//


// todo:
// login
// if not logged in then show home page
// maybe realtime chat?
// ajax content requests
// search

$(function() {
    var wHeight = window.innerHeight,
        navHeight = $('.navbar-header').height() + 1; // +1px to account for border
    console.log(wHeight - navHeight);
    $('main, main > .container').height(wHeight - navHeight);

});