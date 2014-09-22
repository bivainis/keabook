/**
 * Created by gebi on 2014.09.22.
 */
var User = (function(){

    var _userTable;

    var make = function(fields) {

        // todo: check if there are any users in local storage
        // if no users found, create with id 1
        _userTable = localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];

        _userTable.push({
            "id" : 1,
            "name" : "Gediminas",
            "surname" : "Bivainis",
            "email" : fields.email,
            "password" : "{ cryptojs hash }",
            "loggedIn" : false,
            "loginAt" : "{ unix timestamp }",
            "rememberMe" : 0,
            "type" : 1,
            "gravatar" : "{ hash }",
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