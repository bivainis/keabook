var Keabook = (function(){

    var _userTable,
        _postTable,
        _commentTable;

    var _getData = function(){

        return localStorage.keabookPosts ? JSON.parse(localStorage.keabookPosts) : [];
    };

    var _getCommentData = function(){

        return localStorage.keabookComments ? JSON.parse(localStorage.keabookComments) : [];
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

        // last sender id
        var user = User.fetch(User.getCurrentUser());
        console.log(user);

        var post = '<li class="well well-sm clearfix">' +
            '<div class="row"><div class="col-xs-2">'+
            '<img class="pull-left" src="http://1.gravatar.com/avatar/' +
            user.gravatar +
            '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
            '</div><div class="col-xs-10">'+
            '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _postTable[_postTable.length -1].postedAt  + '</small></p>'+
            '<p>'+ msg + '</p>'+
            '</div></div><button class="btn btn-default pull-right" data-commentpost="' + _postTable[_postTable.length -1].id + '">Comment</button>' +
            '</li>';

        post = $(post);
        post.prependTo('[data-postcontainer]');

        // store data
        localStorage.keabookPosts = JSON.stringify(_postTable, null, ' ');
    };
    var comment = function (msg, postId) {

        var date = new Date();
        var dateOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        _commentTable = _getCommentData();

        _commentTable.push({
            //
            "id" : _generatePostId(_postTable),
            "userId" : User.getCurrentUser(),
            "postId" : postId,
            "body" : msg,
            "location" : "{ geodata }",
            "postedAt" : date.toLocaleString('en-us', dateOptions)
        });


        // todo: append comment immediately
       /* var user = User.fetch(User.getCurrentUser());

        var comment = '<li>' +
            _commentTable[_commentTable[_messageTable.length -1]]].body +
            '</li>';

        comment = $(comment);
        ceoment.prependTo('[data-postcontainer]');
*/
        // store data
        localStorage.keabookComments = JSON.stringify(_commentTable, null, ' ');
    };
    var _getComments = function(postId){
        var i= 0,
            comment = '<ul data-commentcontainer>';

        _commentTable = _getCommentData();
        console.log(_commentTable);

        if(_commentTable.length){
            for(; i < _commentTable.length; i++){
                var cid = _commentTable[i].postId;
                var cbody = _commentTable[i].body;



                if(_commentTable[i].postId == postId){


                    comment += '<li>' + cbody + '</li>';
                }
            }
        }

        comment += '</ul>';
        return comment;
    };
    var _getPosts = function(){

        var i= 0,
            post;

        _postTable = _getData();

        if(_postTable.length){

            // clear 'no posts' if there are posts
            $('[data-postcontainer]').empty();

            for(; i < _postTable.length; i++){

                // generate posts
                // store user data into a var for easy access
                var user = User.fetch(_postTable[i].userId);

                var post = '<li class="well well-sm clearfix">' +
                    '<div class="row"><div class="col-xs-2">'+
                    '<img class="pull-left" src="http://1.gravatar.com/avatar/' +
                    user.gravatar +
                    '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
                    '</div><div class="col-xs-10">'+
                    '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _postTable[i].postedAt  + '</small></p>'+
                    '<p>'+ _postTable[i].body + '</p>'+
                    '</div></div><button class="btn btn-default pull-right" data-commentpost="' + _postTable[i].id + '">Comment</button>' +
                    '</li>';

                var comments = _getComments(_postTable[i].id);
                console.log('adsf' + comments);
                post = $(post);
                post.prependTo('[data-postcontainer]');
                $(post).append(comments);
            }

            $('[data-commentpost]').attr('data-sendconfirm', user.id);
        }
    };

    var init = function(){

        _getUsers();
        _getPosts();
    };

    return {
        init : init,
        post : post,
        comment : comment
    };
}());