function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/rikki/users';
    var self = this;
    function findAllUsers() {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/rikki/users')
            .then(response => response.json())
    }
    function createUser(user) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/rikki/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }
    function findUserById(userId) {  }
    function updateUser(userId, user) {
        return fetch(`https://wbdv-generic-server.herokuapp.com/api/rikki/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    function deleteUser(userId) {
        return fetch('https://wbdv-generic-server.herokuapp.com/api/rikki/users/' + userId, {
            method: 'DELETE'
        })
    }
}