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
            messages = '';

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

                    messages += '<li>' +
                    '<img class="pull-left" src="http://1.gravatar.com/avatar/' + user.gravatar + '?size=50px" alt="" width="50px" height="50px"/>' +

                    '<p><strong>' + user.name + ' ' + user.surname +  '</strong><span> '+_messageTable[i].sentAt +'</span></p>'+

                    _messageTable[i].body +

                    '</li>';

                }
            }

            $(messages).appendTo('[data-messagecontainer]');
        }
    };
    var send = function(msg, receiverID){

        _messageTable = _getData();

        _messageTable.push({

            "id" : _generateMessageId(_messageTable),
            "senderId" : _getSenderId(),
            "receiverId" : receiverID,
            "body" : msg,
            "location" : "{ geodata }",
            "sentAt" : "{ unix timestamp }"
        });

        console.table(_messageTable);
        console.log(msg);

        localStorage.keabookMessages = JSON.stringify(_messageTable, null, ' ');
    };

    return {
        send : send,
        list : list
    };
}());