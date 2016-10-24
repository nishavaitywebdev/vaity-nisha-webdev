/**
 * Created by nishavaity on 10/13/16.
 */

(function () {
    angular
        .module ("WebAppMaker")
        .factory("UserService", UserService)
    function UserService($http){

    var users = [
        {_id: "123", email:"alice@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", email:"bob@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", email:"charly@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", email:"jannunzi@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            getAllUsers : getAllUsers

    };
        return api;
        function createUser(username, password) {
            users.push(user);
            //console.log(users);
        }
        function getAllUsers() {
            return users;
        }
        function findUserById(userId) {
            var user;
            for( var u in users){
                if(users[u]._id === userId){
                    user = users[u];
                    console.log(user)
                    break;
                }
            }
            return user;

        }
        function findUserByUsername(username) {

            users.forEach(function(user){
                if(user.username == username){
                    return user;
                }
            });
        }
        function findUserByCredentials(username, password) {

            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);
            // var user;
            // for( var u in users){
            //     if(users[u].username === username && users[u].password === password){
            //         user = users[u];
            //         break;
            //     }
            // }
            // return user;
        }
        function updateUser(userId, userUpdated) {
            for( var u in users){
                if(users[u]._id === userId){
                    users[u] = userUpdated;
                    break;
                }
            }
        }
        function deleteUser(userId) {
            for( var u in users){
                if(users[u]._id === userId.toString()){
                    users.splice(u, 1);
                    console.log(users)
                    break;
                }
            }

        }
}
})();