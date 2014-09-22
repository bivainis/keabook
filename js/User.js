/**
 * Created by gebi on 2014.09.22.
 */
var User = (function(){

    var _userTable;

    var _userExists = function (data) {
        var i = 0;
        for(; i<data.length; i++){
            //console.log(data);
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
        return 'ajdfhasdfjlhjlsdfk';
    };

    var make = function(formData) {


        // check if there are any users in local storage
        _userTable = localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];

        // check if email already exists
        if(_userExists(_userTable)){

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

        if (localStorage.keabookUsers){

            alert('All set');
        }
    };

    return {
        make : make
    };
}());