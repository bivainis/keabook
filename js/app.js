// todo:
// create and init auth module
// validator module
// combine and minify js
// if not logged in then show home page
// use bootstrap modals for login/signup
// maybe realtime chat?
// ajax content requests
// search

// pseudo
// Validator checks inputs and returns errors if any
//
// Auth logs the user in : changes loggedIn to true, and logs out by setting it to false.
// Auth checks when navigating to see if user is logged in, otherwise show home screen
// Auth hashes and decrypts passwords
// Auth stores login time and logout after inactivity of 1 hour, unless 'rememberMe' is clicked when logging in
//
// Navigator loads partials to view, if user is logged in
//
//console.table(JSON.parse(localStorage.keabookMessages));
$(document).on('click', '[data-open]', function () {
    var target = $(this).attr('data-open'),
        popup = $('.popup');

    popup.hide().children().not('.actionButtons, .fa').hide();
    $('#' + target).show();
    popup.show();
    var btns = $('.actionButtons').detach();
    btns.appendTo(popup);
    $('[data-closepopup]').on('click', function(){
        popup.hide();
        $('.homePromo').append(btns);
    });
});
$(document).on('submit', 'form', function (e) {
    e.preventDefault();

    var currentForm = $(this).attr('id');

    if (currentForm == 'signupForm') {

        var email, pass, passRepeat, fields;

        email = $(this).find('#signupEmail').val();
        pass = $(this).find('#signupPassword').val();
        passRepeat = $(this).find('#signupPasswordRepeat').val();

        fields = {
            email : email,
            password : pass,
            passwordRepeat : passRepeat
        };

        // if validator returns true, create a new user
        if(Validator.check(fields)){

            // create new user and send notification back to visitor
            var notification = User.make(fields);
            var notificationEl = '<p class="alert alert-success alert-dismissable">' + notification +'</p>';
            $('.popup .actionButtons').prepend(notificationEl);

        }
    } else if (currentForm == 'loginForm'){

        var email, pass;

        email = $(this).find('#loginEmail').val();
        pass = $(this).find('#loginPassword').val();

        // if validator returns true, create a new user
        if(Validator.check(fields)){

            // login and retrieve notification message
            var notification = Auth.login(email, pass);
            var notificationEl = '<p class="alert alert-warning alert-dismissable">' + notification +'</p>';

            $('.popup .actionButtons').prepend(notificationEl);

            // if validation successful - redirect to keabook page
            if(Auth.check()){

                setTimeout(function(){

                    Navigator.loadView('keabook');
                }, 1000);
            }
        }
    }
});
$(document).on('click','[data-sendmessage]', function(){

    // fadein message form
    $('.messageForm').fadeIn(200);

    $('[data-sendconfirm]').on('click', function() {
        console.log($(this));
        // get message text
        var msg = $(this).closest('.messageForm').find('[data-messagetext]').val();
        var receiverID = $(this).data('sendconfirm');

        // send message to receiver
        Message.send(msg, receiverID);
    });
});

$(function() {

    var wHeight = window.innerHeight,
        navHeight = $('.navbar-header').height() + 1; // +1px to account for border

    $('main').height(wHeight - navHeight);

    $('[data-view]').on('click', function(e){

        e.preventDefault();

        // if navbar is expanded (mobile) then collapse it by simulating a click
        if($('.navbar-collapse').hasClass('in')) {

            $(".navbar-toggle").click();
        }

        var view = $(this).attr('data-view');

        Navigator.loadView(view);
    });

    $('[data-logout]').on('click', function(e){

        e.preventDefault();

        // if navbar is expanded (mobile) then collapse it by simulating a click
        if($('.navbar-collapse').hasClass('in')) {

            $(".navbar-toggle").click();
        }

        Auth.logout();
    });
});