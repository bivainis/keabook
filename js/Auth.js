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

            toReturn = _userTable[i].loggedIn == true ?
                {
                    loggedIn : true,
                    userId : _userTable[i].id
                } : false;
        }
        return toReturn;
    };
    var logout = function(){

        if(authCheck()) {

            var i = 0;

            for(; i<_userTable.length; i++){

                _userTable[i].loggedIn = _userTable[i].loggedIn ? false : false;
            }
            localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');
            // todo: redirect to home
            Navigator.loadView('home');
        } else {

            message = 'You are not logged in';
        }
    };
    var login = function(email, pass){

        // if already logged in, warn user and escape
        if(authCheck()) {
            message = 'To login please log out first';
            return message;
        }

        var i = 0,
            email = email,
            emails = [];

        for(; i<_userTable.length; i++){

            emails.push(_userTable[i].email);
        }

        if(emails.indexOf(email) != -1) {

            // email found, check password
            _currentUserIndex = emails.indexOf(email);

            if(_userTable[_currentUserIndex].password == pass){

                // passwords match, login
                // todo: hash
                message = 'Password matched, welcome';

                // todo: set loggedin to true
                _userTable[_currentUserIndex].loggedIn = true;

                localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');

                // todo: redirect to keabook

            } else {
                message = 'Password did not match, try again';
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