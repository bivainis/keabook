var Admin = (function(){

    var _userTable;

    var _assignAdminActions = function(tableEl) {

        // delete user action
        tableEl.find('[data-deleteuser]').click(function() {

            var userToDelete = $(this).data('deleteuser');

            _deleteUser(userToDelete);

            // remove user row from table
            $(this).closest('tr').remove();
        });

        // block user action
        tableEl.find('[data-blockuser]').click(function() {

            var userToBlock = $(this).data('blockuser');

            _blockUser(userToBlock);

            //
            $(this).closest('tr').toggleClass('alert-danger');
        });
    };
    var listUsers = function() {

        var i = 0,
            tableEl = $('[data-usertable]'),
            tableData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = JSON.parse(localStorage.keabookUsers);

        for (; i < _userTable.length; i++){

            var rowClass = '';

            if(_userTable[i].type == 1){
                rowClass = 'alert-warning';
            } else if(_userTable[i].type == 6){
                rowClass = 'alert-danger';
            }

            tableData += '<tr class="alert ' + rowClass + '">' +
                '<td>' + _userTable[i].id + '</td>' +
                '<td>' + _userTable[i].name + ' ' + _userTable[i].surname + '</td>' +
                '<td>' + _userTable[i].email + '</td>' +
                '<td>' + _userTable[i].type + '</td>' +
                '<td>' + _userTable[i].created + '</td>' +
                '<td>' + _userTable[i].login + '</td>' +
                '<td>' +
                    '<button data-edituser="' + _userTable[i].id + '"><span class="fa fa-pencil fa-fw"></span></button>' +
                    '<button data-blockuser="' + _userTable[i].id + '"><span class="fa fa-ban fa-fw"></span></button>' +
                    '<button data-deleteuser="' + _userTable[i].id + '"><span class="fa fa-trash fa-fw"></span></button>' +
                '</td>' +
            '</tr>';
        }

        tableEl.append(tableData);

        _assignAdminActions(tableEl);
    };
    var _deleteUser = function(userID){

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
    var _blockUser = function(userID){


    };
    var _updateUser = function(userID) {


    };
    return {
        listUsers : listUsers
    };
}());