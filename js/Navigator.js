/**
 * Created by gebi on 2014.09.22.
 */
var Navigator = (function(){

    var _checkAuth = function (){
        // todo: check with Auth.check()
        return true;
    };
    var loadView = function(partialName){

        if(!_checkAuth()) {
            return false;
        }
        // todo: load default home view if not logged in
        // todo: if view is adminpanel, check if user type is 1
        // todo: check if current view is not target view
        // todo: store loaded views for quick access and saving on http requests
        // todo: show preloader
        // todo: close menu when clicked if the link comes from menu
        // todo: if logged in - logo links to posts page

        var container = $('[data-viewport]'),
            url = '_partials/' + partialName + '.html';


        $.ajax({
            type: 'get',
            url: url,
            //async: false,
            dataType: 'html',

            success : function(data){

                container.html(data);
            }
        });
    };
    return {
        loadView : loadView
    };
}());