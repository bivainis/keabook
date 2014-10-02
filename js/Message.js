/**
 * Created by gebi on 2014.09.22.
 */
var Message = (function(){

    var _messageTable,
        _senderID,
        _receiverID;

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

        return 1;
    };

    var _getReceiverId = function() {

        return 2;
    };

    var send = function(msg){

        _messageTable = _getData();

        _messageTable.push({

            "id" : _generateMessageId(_messageTable),
            "senderId" : _getSenderId(),
            "receiverId" : _getReceiverId(),
            "body" : msg,
            "location" : "{ geodata }",
            "sentAt" : "{ unix timestamp }"
        });

        console.table(_messageTable);
        console.log(msg);

        localStorage.keabookMessages = JSON.stringify(_messageTable, null, ' ');
    };

    return {
        send : send
    };
}());