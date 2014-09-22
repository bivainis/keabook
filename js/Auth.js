/**
 * Created by gebi on 2014.09.22.
 */
var Auth = (function(){

    var check = function() {

    };
    var logout = function(){

    };
    var login = function(email, pass){

        // compare email with existing emails
        var _userTable = localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];
        //console.table(_userTable);
        var i = 0,
            email = email,
            emails = [];

        for(; i<_userTable.length; i++){

            emails.push(_userTable[i].email);
        }

        if(emails.indexOf(email) != -1) {

            // email found, check password
            var currentUserIndex = emails.indexOf(email);

            if(_userTable[currentUserIndex].password == pass){

                // passwords match, login
                // todo: hash
                alert('Password matched, welcome');
                // todo: redirect to keabook
            } else {
                alert('Password did not match, try again');
            }
        }
    };
    return {
        login : login,
        logout : logout,
        check : check
    };
}());