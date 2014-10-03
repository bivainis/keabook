/**
 * Created by gebi on 2014.09.22.
 */
var Navigator = (function(){

    var _views = {};

    var loadView = function(partialName){

        // todo: if view is adminpanel, check if user type is 1
        // todo: check if current view is not target view
        // todo: store loaded views for quick access and saving on http requests
        // todo: show preloader
        // todo: close menu when clicked if the link comes from menu
        // todo: if logged in - logo links to posts page

        var container = $('[data-viewport]'),
            url = '_partials/' + partialName + '.html';

        // if authentication fails, then set url and partial name to home
        if(!Auth.check()) {

            partialName = 'home';
            url = '_partials/' + partialName + '.html';
        }

        // when trying to access admin panel, check if user is admin,
        // redirect to home if not
        if(partialName == 'adminpanel'){

            var authData = Auth.check();

            if(authData.isAdmin == 0){

                partialName = 'home';
                url = '_partials/' + partialName + '.html';
            }
        }

        // if clicking on keabook logo, check if logged in and return keabook view
        if(partialName == 'home'){

            var authData = Auth.check();

            if(authData.loggedIn == true){

                partialName = 'keabook';
                url = '_partials/' + partialName + '.html';

                $('main').height('auto');
            }
        }

        // if target view html already exists in _views object, load that view, else - ajax
        if(_views[partialName]){

            container.html(_views[partialName]);

            if(partialName == 'adminpanel'){

                Admin.listUsers();
            }

            if(partialName == 'keabook'){

                Keabook.init();
            }

            // show profile of currently logged in user
            if(partialName == 'profile'){

                User.showProfile(User.getCurrentUser());
            }
            if(partialName == 'messages'){

                Message.list();
            }
        } else {

            $.ajax({
                type: 'get',
                url: url,
                //async: false,
                cache: false, // turn off cache so the views are always fresh (for development)
                dataType: 'html',
                contentType: 'text/html; charset=utf-8',
                success : function(data){

                    _views[partialName] = data;


                    container.html(data);

                    if(partialName == 'adminpanel'){

                        Admin.listUsers();
                    }

                    if(partialName == 'keabook'){

                        Keabook.init();
                    }

                    // show profile of currently logged in user
                    if(partialName == 'profile'){

                        User.showProfile(User.getCurrentUser());
                    }

                    if(partialName == 'messages'){

                        Message.list();
                    }
                }
            });
        }
    };
    return {
        loadView : loadView
    };
}());