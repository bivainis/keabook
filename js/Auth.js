/**
 * Created by gebi on 2014.09.22.
 */
var Auth = (function(){

    var _currentUserIndex,
        _userTable,
        message;

    var authCheck = function() {

        var i = 0,
            toReturn;

        _userTable = localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];

        for(; i<_userTable.length; i++){

            if (_userTable[i].loggedIn == true){

                return {
                    loggedIn : true,
                    userId : _userTable[i].id,
                    isAdmin : _userTable[i].type
                };
            }
        }
        return false;
    };
    var logout = function(){

        if(authCheck()) {

            var i = 0;

            for(; i < _userTable.length; i++){

                _userTable[i].loggedIn = _userTable[i].loggedIn ? false : false;
            }
            // save data
            localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');

            // redirect to home
            Navigator.loadView('home');
            $('main').height($(window).height());
        } else {

            alert('You are not logged in');
        }
    };
    var login = function(email, pass){

        var i = 0,
            email = email,
            emails = [];

        // if already logged in, warn user and escape
        if(authCheck()) {
            alert('To login please log out first');
            return;
        }

        for(; i<_userTable.length; i++){

            emails.push(_userTable[i].email);
        }

        if(emails.indexOf(email) != -1) {

            // email found, check password
            _currentUserIndex = emails.indexOf(email);

            if(_userTable[_currentUserIndex].password == pass && _userTable[_currentUserIndex].type != 6){

                // passwords match, login
                message = 'Password matched, welcome';

                // set loggedin to true
                _userTable[_currentUserIndex].loggedIn = true;

                // set last login time to now
                var date = new Date();
                var dateOptions = {
                    weekday: "long", year: "numeric", month: "short",
                    day: "numeric", hour: "2-digit", minute: "2-digit"
                };
                _userTable[_currentUserIndex].lastLoginAt = date.toLocaleTimeString("en-us", dateOptions);

                // save data
                localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');

            } else {
                message = 'Password did not match, or user blocked';
            }
        } else {
            message = 'User not found. Please use a registration form to sign up';
        }
        return message;
    };
    return {
        login : login,
        logout : logout,
        check : authCheck
    };
}());