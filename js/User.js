/**
 * Created by gebi on 2014.09.22.
 */
var User = (function(){

    var _userTable;

    var _getData = function(){

        return localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];
    };
    var _userExists = function (data, email) {
        var i = 0,
            email = email,
            emails = [];

        for(; i<data.length; i++){

            emails.push(data[i].email);
        }

        if(emails.indexOf(email) != -1) {

            return true;
        }

        return false;
    };
    var _generateUserId = function (data) {

        var newId;

        if (data.length > 0){
            var lastInsert = data.slice(-1),
                lastId = lastInsert[0].id;

            newId = lastId+1;
        } else {
            newId = 1;
        }

        return newId;
    };
    var _getGravatar = function (email) {

        var hash;
        // todo: hash email with md5


        return hash;
    };

    var make = function(formData) {

        // check if there are any users in local storage
        _userTable = _getData();

        // check if email already exists
        if(_userExists(_userTable, formData.email)){
            // todo: modal instead of alert
            alert('Email already exists, please log in or choose a different email');
            return false;
        }

        _userTable.push({
            "id" : _generateUserId(_userTable),
            //"name" : undefined,
            //"surname" : undefined,
            "email" : formData.email,
            "password" : formData.password,
            "loggedIn" : false, // default
            "lastLoginAt" : null,
            "rememberMe" : 0,
            "type" : 0, // 0 - regular, 1 - admin
            "gravatar" : _getGravatar(formData.email),
            "createdAt" : "{ unix timestamp }",
            "updatedAt" : "{ unix timestamp }"
        });

        localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');

        // todo: inform about success
    };

    var showProfile = function () {

        var i = 0,
            profileData;

        _userTable = _getData();

        for(; i < _userTable.length; i++) {

            if (_userTable[i].loggedIn == true){

                profileUsername = _userTable[i].name;

                $('#profileInfo')
                    .find('[data-profileuser]').text();
            }
        }
    };
    return {
        make : make,
        showProfile : showProfile
    };
}());