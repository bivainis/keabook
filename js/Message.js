/**
 * Created by gebi on 2014.09.22.
 */
var Message = (function(){

    var _messageTable;

    var init = function(){
        _messageTable = localStorage.keabookMessages ? JSON.parse(localStorage.keabookMessages) : [];
        console.table(_messageTable);
    };
    var send = function(msg){
       // console.table(_messageTable);
        console.log(msg);
    };

    return {
        init : init,
        send : send
    };
}());