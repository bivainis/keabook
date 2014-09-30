var Admin = (function(){

    var _userTable;

    var listUsers = function() {

        var i = 0,
            tableEl = $('[data-usertable]'),
            tableData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = JSON.parse(localStorage.keabookUsers);

        for (; i < _userTable.length; i++){

            tableData += '<tr>' +
                '<td>' + _userTable[i].id + '</td>' +
                '<td>' + _userTable[i].name + ' ' + _userTable[i].surname + '</td>' +
                '<td>' + _userTable[i].email + '</td>' +
                '<td>' + _userTable[i].type + '</td>' +
                '<td>' + _userTable[i].created + '</td>' +
                '<td>' + _userTable[i].login + '</td>' +
                '<td><button data-deleteuser="' + _userTable[i].id + '"><span class="fa fa-trash"></span></button></td>' +
            '</tr>';
        }

        tableEl.append(tableData);

        tableEl.find('[data-deleteuser]').click(function() {

            var userToDelete = $(this).data('deleteuser');

            deleteUser(userToDelete);

            // remove user row from table
            $(this).closest('tr').remove();
        });

    };
    var deleteUser = function(userID){

        // remove user from user data array

        var i = 0;

        for(; i < _userTable.length; i++){

            // delete matched user from data
            if(_userTable[i].id == userID){

                _userTable.splice(i, 1);
            }
        }

        // update data on storage
        localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');
    };
    var blockUser = function(userID){


    };
    var updateUser = function(userID) {


    };
    return {
        listUsers : listUsers,
        deleteUser : deleteUser,
        blockUser : blockUser,
        updateUser : updateUser
    };
}());