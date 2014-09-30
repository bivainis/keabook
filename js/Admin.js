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

            var currentBtn = $(this),
                userToBlock = currentBtn.data('blockuser');

            _blockUser(userToBlock);

            // toggle danger class on the blocked user
            currentBtn.closest('tr').toggleClass('alert-danger');

            // toggle icon for user blocking button based on current class
            currentBtn.find('span').toggleClass('fa-microphone-slash');
            currentBtn.find('span').toggleClass('fa-microphone');
        });
    };
    var listUsers = function() {

        var i = 0,
            tableEl = $('[data-usertable]'),
            tableData = '';

        // get user data (no need to check if exists, since admin is already loggedin)
        _userTable = JSON.parse(localStorage.keabookUsers);

        for (; i < _userTable.length; i++){

            var rowClass = '',
                isBannedClass = 'fa-microphone-slash';

            if(_userTable[i].type == 1){
                rowClass = 'alert-warning';
            } else if(_userTable[i].type == 6){
                rowClass = 'alert-danger';
                isBannedClass = 'fa-microphone';
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
                    '<button data-blockuser="' + _userTable[i].id + '"><span class="fa ' + isBannedClass + ' fa-fw"></span></button>' +
                    '<button data-deleteuser="' + _userTable[i].id + '"><span class="fa fa-bomb fa-fw"></span></button>' +
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

        var i = 0;

        for (; i < _userTable.length; i++){

            if(_userTable[i].id == userID) {

                // toggle user blocking
                _userTable[i].type = _userTable[i].type == 6 ? 0 : 6;
            }
        }

        // update data on storage
        localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');
    };
    var _updateUser = function(userID) {


    };
    return {
        listUsers : listUsers
    };
}());