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


$(function() {

    var wHeight = window.innerHeight,
        navHeight = $('.navbar-header').height() + 1; // +1px to account for border

    $('main').height(wHeight - navHeight);

    $('[data-open]').on('click', function(){

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



    $('form').on('submit', function(e) {

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

                User.make(fields);
            }
        } else if (currentForm == 'loginForm'){

            var email, pass;

            email = $(this).find('#loginEmail').val();
            pass = $(this).find('#loginPassword').val();

            // if validator returns true, create a new user
            if(Validator.check(fields)){

                Auth.login(email, pass);
            }
        }
    });

    $('[data-view]').on('click', function(e){

        e.preventDefault();

        $(".navbar-toggle").click() //bootstrap 3.x by Richard

        var view = $(this).attr('data-view');

        Navigator.loadView(view);
    });
});