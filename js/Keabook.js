var Keabook = (function(){

    var _userTable,
        _postTable,
        _commentTable;

    var _getData = function(){

        return localStorage.keabookPosts ? JSON.parse(localStorage.keabookPosts) : [];
    };

    var _getUserData = function(){

        return localStorage.keabookUsers ? JSON.parse(localStorage.keabookUsers) : [];
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

    var _getUserbar = function () {

        var userbar = $('[data-userbar]');
        var currentUser = User.fetch(User.getCurrentUser());
        var userImgSrc = 'http://1.gravatar.com/avatar/' + currentUser.gravatar + '?size=400px';
        var userbarHtml =
            '<img class="img-responsive img-thumbnail" src="' +
                userImgSrc + '" alt="User image" />' +
            '<h3>' + currentUser.name + ' ' + currentUser.surname + '</h3>'+
            '<button class="viewProfile btn btn-default btn-sm">View profile</button>';


        userbar.html(userbarHtml);
        $('.viewProfile').click(function () {

            Navigator.loadView('profile');
        });
    };

    var _getUsers = function() {

        var i = 0,
            listEl = $('[data-keabookusers]'),
            userData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = _getUserData();

        for (; i < _userTable.length; i++){

            userData += '<li class="userListItem list-unstyled clearfix">' +
            '<img class="img-thumbnail" src="http://1.gravatar.com/avatar/' + _userTable[i].gravatar + '?size=30px" alt="" width="40px" height="40px"/>' +
            '<div data-email data-id="' + _userTable[i].id + '">' + _userTable[i].email + '</div>' +
            '<div data-name><strong>' + _userTable[i].name + _userTable[i].surname + '</strong></div>' +
            '<hr></li>';
        }
        listEl.append(userData);
        listEl.height($(window).height() - 110);
        $(window).scroll(function() {
            if($(this).scrollTop() > 60){

                listEl.parent().css({'top': '10px', 'right': '0', 'position':'fixed'});
                listEl.height($(window).height() - 40);
            } else {
                listEl.parent().css({'top': 'auto', 'right': 'auto', 'position':'inherit'});
                listEl.height($(window).height() - 110);
            }
        });

    };
    var _getPosts = function(){

        var i= 0;

        _postTable = _getData();

        if(_postTable.length){

            // clear 'no posts' if there are posts
            $('[data-postcontainer]').empty();

            for(; i < _postTable.length; i++){

                // generate posts
                // store user data into a var for easy access
                var user = User.fetch(_postTable[i].userId);

                var post =
                    '<li class="well well-sm">' +
                        '<div class="row">'+
                            '<div class="col-xs-12">'+
                                '<img class="img-thumbnail pull-left" src="http://1.gravatar.com/avatar/' +
                                    user.gravatar + '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
                                '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _postTable[i].postedAt  + '</small></p>'+
                                '<p>'+ _postTable[i].body + '</p>'+
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-xs-12">'+
                                '<button class="btn btn-default pull-right" data-commentpost="' + _postTable[i].id + '">Comment</button>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<ul class="list-unstyled commentContainer" data-commentcontainer></ul>' +
                        '</div>' +
                    '</li>';

                var comments = _getComments(_postTable[i].id);

                // make post a jquery object
                post = $(post);

                // inject into page
                post.prependTo('[data-postcontainer]');

                // append comments
                $(post).find('[data-commentcontainer]').append(comments);
            }

            $('[data-commentpost]').attr('data-sendconfirm', user.id);
        }
    };
    var post = function(msg) {

        var date = new Date();
        var dateOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        _postTable = _getData();
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

        var post = '<li class="well well-sm">' +
            '<div class="row"><div class="col-xs-2">'+
            '<img class="img-thumbnail pull-left" src="http://1.gravatar.com/avatar/' +
            user.gravatar +
            '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
            '</div><div class="col-xs-10">'+
            '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _postTable[_postTable.length -1].postedAt  + '</small></p>'+
            '<p>'+ msg + '</p>'+
            '</div></div><button class="btn btn-default pull-right" data-commentpost="' + _postTable[_postTable.length -1].id + '">Comment</button>' +
            '<div class="row">' +
                '<ul class="list-unstyled commentContainer" data-commentcontainer></ul>' +
            '</div>' +
            '</li>';

        post = $(post);
        post.prependTo('[data-postcontainer]');

        // store data
        localStorage.keabookPosts = JSON.stringify(_postTable, null, ' ');
    };

    var _getComments = function(postId){
        var i= 0,
            comment = '';

        _commentTable = _getCommentData();

        if(_commentTable.length){
            for(; i < _commentTable.length; i++){
                var cid = _commentTable[i].postId;
                var cbody = _commentTable[i].body;
                var usr = User.fetch(_commentTable[i].userId);

                if(_commentTable[i].postId == postId){

                    comment +=
                        '<li>' +
                            '<strong>' +
                                usr.name + ' ' + usr.surname +
                            '</strong>' +
                            '<small> on ' + _commentTable[i].postedAt + '</small>' +
                            '<p> '+
                                cbody  +
                            '</p>' +
                        '</li>';
                }
            }
        }

        comment += '';
        return comment;
    };

    var comment = function (msg, postId) {

        var date = new Date();
        var dateOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };
        var user = User.fetch(User.getCurrentUser());
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

        var comment = '';

        if( _commentTable[_commentTable.length -1].postId = postId){

            comment =
                '<li>' +
                    '<strong>' +
                        user.name + ' ' + user.surname +
                    '</strong>' +
                    '<small> on ' + _commentTable[_commentTable.length -1].postedAt + '</small>' +
                    '<p>' +
                        _commentTable[_commentTable.length -1].body +
                    '</p>' +
                '</li>';
        }

        var targetPost = $('[data-commentpost="' + postId +'"]').closest('.well');
        console.log(targetPost.find('[data-commentcontainer]'));
        comment = $(comment);
        //comment.appendTo('[data-commentcontainer]');
        targetPost.find('[data-commentcontainer]').append(comment);
        // store data
        localStorage.keabookComments = JSON.stringify(_commentTable, null, ' ');
    };

    var init = function(){

        _getUserbar();
        _getUsers();
        _getPosts();
    };

    return {
        init : init,
        post : post,
        comment : comment
    };
}());