var Keabook = (function(){

    var _userTable,
        _postTable;

    var _getData = function(){

        return localStorage.keabookPosts ? JSON.parse(localStorage.keabookPosts) : [];
    };

    var _generatePostId = function (data) {

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

    var _getUsers = function() {

        var i = 0,
            listEl = $('[data-keabookusers]'),
            userData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = JSON.parse(localStorage.keabookUsers);

        for (; i < _userTable.length; i++){

            userData += '<li class="userListItem list-unstyled clearfix"><hr>' +
            '<img src="http://1.gravatar.com/avatar/' + _userTable[i].gravatar + '?size=30px" alt="" width="30px" height="30px"/>' +
            '<div data-email data-id="' + _userTable[i].id + '">' + _userTable[i].email + '</div>' +
            '<div data-name><strong>' + _userTable[i].name + _userTable[i].surname + '</strong></div>' +
            '</li>';
        }
        listEl.append(userData);
        listEl.height($(window).height() - 170);

    };
    var post = function(msg) {

        var date = new Date();
        var dateOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        _postTable = _getData();
        console.table(_postTable);
        //
        _postTable.push({
        //
            "id" : _generatePostId(_postTable),
            "userId" : User.getCurrentUser(),
            "title" : '{title}',
            "body" : msg,
            "location" : "{ geodata }",
            "postedAt" : date.toLocaleString('en-us', dateOptions),
            "updatedAt" : 0
        });
        console.log(_postTable);

        // last sender id
        var user = User.fetch(User.getCurrentUser());
        console.log(user);

        var post = '<li class="well well-sm">' +
            '<div class="row"><div class="col-xs-2">'+
            '<img class="pull-left" src="http://1.gravatar.com/avatar/' +
            user.gravatar +
            '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
            '</div><div class="col-xs-10">'+
            '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _postTable[_postTable.length -1].postedAt  + '</small></p>'+
            '<p>'+ msg + '</p>'+
            '</div></div>' +
            '</li>';

        $(post).prependTo('[data-postcontainer]');
        //
        //localStorage.keabookMessages = JSON.stringify(_messageTable, null, ' ');
    };
    var comment = function () {

    };
    var _getPosts = function(){


    };
    var _getComments = function(){


    };
    var init = function(){

        _getUsers();
    };

    return {
        init : init,
        post : post,
        comment : comment
    };
}());