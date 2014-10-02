/**
 * Created by gebi on 2014.09.22.
 */
var User = (function(){

    var _userTable;

    var _getData = function(){

        return localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];
    };

    var getCurrentUser = function () {

        var i = 0,
            currentUser;

        _userTable = _getData();

        for(; i < _userTable.length; i++){

            if(_userTable[i].loggedIn){
                currentUser = _userTable[i].id;
            }
        }
        return currentUser;
    };

    var getFullName = function(userId) {
        console.log(userId);
        var i = 0;

        _userTable = _getData();

        for(; i < _userTable.length; i++) {

            if(_userTable[i].id == userId){

                return _userTable[i].name + ' ' + _userTable[i].surname;
            }
        }
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

        // hash email with md5
        var hash = CryptoJS.MD5(email);
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
            "name" : '(update your name)',
            "surname" : '(update your surname)',
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

    var showProfile = function(userID) {

        var i = 0,
            profileEl = $('#profileInfo'),
            userIndex, userImg, userName, userSurname, userEmail, userCreatedAt, userUpdatedAt;

        _userTable = _getData();

        for(; i < _userTable.length; i++) {

            if (_userTable[i].id == userID){

                userIndex = i;
                //userID = _userTable[i].id;
                userImg = 'http://1.gravatar.com/avatar/' + _userTable[i].gravatar + '?size=400px';
                userName = _userTable[i].name;
                userSurname = _userTable[i].surname;
                userEmail = _userTable[i].email;
                userCreatedAt = _userTable[i].createdAt;
                userUpdatedAt = _userTable[i].updatedAt;
            }
        }

        // update profile fields with user data
        profileEl.find('[data-profileuser]').text(userEmail);
        profileEl.find('[data-profilepic]').attr('src', userImg);
        profileEl.find('[data-profilename]').text(userName + ' ' + userSurname);
        profileEl.find('[data-profileemail]').text(userEmail);
        profileEl.find('[data-profilesince]').text('Member since: ' + userCreatedAt);
        profileEl.find('[data-profilelastupdate]').text('Last update: ' + userUpdatedAt);

        // attach profile user id to button to be used as recipient id upon sending
        profileEl.find('[data-sendconfirm]').attr('data-sendconfirm', userID);

        profileEl.on('click', '.fa-pencil', function(){

            var parentEl = $(this).parent();
            var input = parentEl.find('input');

            // set input value to the current user's data
            if(parentEl.find('span').data('profilename') != undefined){

                input.first().val(userName);
                input.last().val(userSurname);
            } else {

                input.val(parentEl.find('span').text());
            }

            // handle element showing
            input.show();
            parentEl.find('.fa-save').show();
            $(this).hide();
        });

        profileEl.on('click', '.fa-save', function(){

            var parentEl = $(this).parent();
            var input = parentEl.find('input');
            var inputVal = input.val();
            var data = {
                name : parentEl.find('[data-inputname]').val(),
                surname : parentEl.find('[data-inputsurname]').val(),
                email : parentEl.find('[data-inputemail]').val(),
                password : parentEl.find('[data-inputpassword]').val()
            };

            // place new value in profile immediately upon saving
            parentEl.find('[data-profilename]').text(data.name + ' ' + data.surname);
            parentEl.find('[data-profileemail]').text(data.email);
            parentEl.find('[data-profilepassword]').text(data.password);

            _updateProfile(userIndex, data);

            // handle element showing
            input.hide();
            parentEl.find('.fa-pencil').show();
            $(this).hide();
        });

        console.log('id' +userID);
    };

    var _updateProfile = function(userIndex, data){

        // update table with new value or leave old one if doesn't exist
        _userTable[userIndex].name = data.name ? data.name : _userTable[userIndex].name;
        _userTable[userIndex].surname = data.surname ? data.surname : _userTable[userIndex].surname;
        _userTable[userIndex].email = data.email ? data.email : _userTable[userIndex].email;
        _userTable[userIndex].password = data.password ? data.password : _userTable[userIndex].password;

        // save data
        localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');
    };

    return {
        make : make,
        showProfile : showProfile,
        getCurrentUser : getCurrentUser,
        getFullName : getFullName
    };
}());