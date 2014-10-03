/**
 * Created by gebi on 2014.09.22.
 */
var Message = (function(){

    var _messageTable;

    var _getData = function(){

         return localStorage.keabookMessages ? JSON.parse(localStorage.keabookMessages) : [];
    };

    var _generateMessageId = function (data) {

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

    var _getSenderId = function() {

        return User.getCurrentUser();
    };

    var list = function(){

        var i= 0,
            message;

        _messageTable = _getData();

        if(_messageTable.length){

            // clear 'no messages' if there are messages
            $('[data-messagecontainer]').empty();

            for(; i < _messageTable.length; i++){

                // if sender or receiver is current user,
                // append messages to list
                if(_messageTable[i].senderId == _getSenderId() || _messageTable[i].receiverId == _getSenderId()){

                    // store user data into a var for easy access
                    var user = User.fetch(_messageTable[i].senderId);

                    message = '<li class="well well-sm">' +
                        '<div class="row"><div class="col-xs-2">'+
                            '<img class="pull-left" src="http://1.gravatar.com/avatar/' +
                                user.gravatar +
                                '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
                        '</div><div class="col-xs-10">'+
                            '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _messageTable[i].sentAt  + '</small></p>'+
                            '<p>'+ _messageTable[i].body + '</p>'+
                        '</div></div>' +
                    '</li>';
                    $(message).prependTo('[data-messagecontainer]');
                }
            }

            //$(messages).appendTo('[data-messagecontainer]');
            $('[data-sendconfirm]').attr('data-sendconfirm', user.id);
        }
    };
    var send = function(msg, receiverID){

        var date = new Date();
        var dateOptions = {
            weekday: "long", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        _messageTable = _getData();

        _messageTable.push({

            "id" : _generateMessageId(_messageTable),
            "senderId" : _getSenderId(),
            "receiverId" : receiverID,
            "body" : msg,
            "location" : "{ geodata }",
            "sentAt" : date.toLocaleString('en-us', dateOptions)
        });

        // last sender id
        var user = User.fetch(_messageTable[_messageTable.length -1].senderId);
        var message = '<li class="well well-sm">' +
        '<div class="row"><div class="col-xs-2">'+
        '<img class="pull-left" src="http://1.gravatar.com/avatar/' +
        user.gravatar +
        '?size=50px" alt="" width="50px" height="50px" alt="Profile picture" class="img-rounded img-responsive" />' +
        '</div><div class="col-xs-10">'+
        '<p><strong>'+ user.name + ' ' + user.surname + '</strong> on <small>' + _messageTable[_messageTable.length -1].sentAt  + '</small></p>'+
        '<p>'+ msg + '</p>'+
        '</div></div>' +
        '</li>';

        $(message).prependTo('[data-messagecontainer]');

        localStorage.keabookMessages = JSON.stringify(_messageTable, null, ' ');
    };

    return {
        send : send,
        list : list
    };
}());