var Admin = (function(){

    var _userTable,
        _editUsersMode;

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
                '<td data-id="' + _userTable[i].id + '">' + _userTable[i].id + '</td>' +
                '<td data-img><img src="http://1.gravatar.com/avatar/' + _userTable[i].gravatar + '?size=30px" alt="" width="30px" height="30px"/></td>' +
                '<td data-name>' + _userTable[i].name + '</td>' +
                '<td data-surname>' + _userTable[i].surname + '</td>' +
                '<td data-email>' + _userTable[i].email + '</td>' +
                '<td data-role>' + _userTable[i].type + '</td>' +
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

    var _updateUser = function(userID, data) {

        var i = 0;

        // todo: validate data and email unique

        // update localStorage
        for(; i < _userTable.length; i++){

            if (_userTable[i].id == userID){

                _userTable[i].name = data.name ? data.name : _userTable[i].name;
                _userTable[i].surname = data.surname ? data.surname : _userTable[i].surname;
                _userTable[i].email = data.email ? data.email : _userTable[i].email;
                _userTable[i].type = data.role ? data.role : _userTable[i].type;
            }
        }

        localStorage.keabookUsers = JSON.stringify(_userTable, null, ' ');
    };

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

        // edit user action
        tableEl.find('[data-edituser]').click(function() {

            var currentBtn = $(this),
                userToEdit = currentBtn.data('edituser');

            // toggle edit users mode
            _editUsersMode = _editUsersMode ? 0 : 1;

            if(_editUsersMode){

                var nameInput = '<input class="form-control input-sm" type="text" id="nameInputAdmin" placeholder="New name">';
                var surnameInput = '<input class="form-control input-sm" type="text" id="surnameInputAdmin" placeholder="New surname">';
                var emailInput = '<input class="form-control input-sm" type="email" id="emailInputAdmin" placeholder="New email">';
                var roleInput = '<input class="form-control input-sm" type="number" id="roleInputAdmin">';
                currentBtn.closest('tr').find('[data-name]').append(nameInput);
                currentBtn.closest('tr').find('[data-surname]').append(surnameInput);
                currentBtn.closest('tr').find('[data-email]').append(emailInput);
                currentBtn.closest('tr').find('[data-role]').append(roleInput);

            } else {

                // prepare data if changed
                var data = {
                    name: $('#nameInputAdmin').val() || undefined,
                    surname: $('#surnameInputAdmin').val() || undefined,
                    email: $('#emailInputAdmin').val() || undefined,
                    role: $('#roleInputAdmin').val() || undefined
                };

                if($('#nameInputAdmin').val().length) {

                    currentBtn.closest('tr').find('[data-name]').html($('#nameInputAdmin').val());
                }
                if($('#surnameInputAdmin').val().length) {

                    currentBtn.closest('tr').find('[data-surname]').html($('#surnameInputAdmin').val());
                }
                if($('#emailInputAdmin').val().length) {

                    currentBtn.closest('tr').find('[data-email]').html($('#emailInputAdmin').val());
                }
                if($('#roleInputAdmin').val().length) {

                    currentBtn.closest('tr').find('[data-role]').html($('#roleInputAdmin').val());
                }


                // remove input fields when saving data
                $('#nameInputAdmin').remove();
                $('#surnameInputAdmin').remove();
                $('#emailInputAdmin').remove();
                $('#roleInputAdmin').remove();

                _updateUser(userToEdit, data);
            }

            // toggle icon for user blocking button based on current class
            currentBtn.find('span').toggleClass('fa-pencil');
            currentBtn.find('span').toggleClass('fa-save');
        });
    };
    return {
        listUsers : listUsers
    };
}());