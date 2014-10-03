var Keabook = (function(){

    var _userTable;

    var getUsers = function() {
/*
        var i = 0,
            listEl = $('[data-keabookusers]'),
            userData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = JSON.parse(localStorage.keabookUsers);

        for (; i < _userTable.length; i++){

            userData += '<li>' +
            '<div data-id="' + _userTable[i].id + '">' + _userTable[i].id + '</div>' +
            '<div data-img><img src="http://1.gravatar.com/avatar/' + _userTable[i].gravatar + '?size=30px" alt="" width="30px" height="30px"/></div>' +
            '<div data-name>' + _userTable[i].name + '</div>' +
            '<div data-surname>' + _userTable[i].surname + '</div>' +
            '</li>';
        }
        listEl.append(userData);*/
    };

    var init = function(){

        //_getUsers();
    };

    return {
        init : init,
        getUsers : getUsers
    };
}());