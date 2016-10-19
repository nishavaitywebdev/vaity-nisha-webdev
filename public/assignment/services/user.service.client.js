/**
 * Created by nishavaity on 10/13/16.
 */

(function () {
    angular
        .module ("WebAppMaker")
        .factory("UserService", UserService)
    function UserService(){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser

    };
        return api;
        function createUser(user) {
            users.add(user);
        }
        function findUserById(userId) {

            users.forEach(function(user){
                if(user._id == userId){
                    return user;
                }
            });

        }
        function findUserByUsername(username) {

            users.forEach(function(user){
                if(user.username == username){
                    return user;
                }
            });
        }
        function findUserByCredentials(username, password) {
            users.forEach(function(user){
                if(user.username == username && user.password == password){
                    return user;
                }
            });
        }
        function updateUser(userId, userUpdated) {
            users.forEach(function(user){
                if(user._id == userId){
                    users.remove(user);
                    users.add(userUpdated);
                }
            });
        }
        function deleteUser(userId) {
            users.forEach(function(user){
                if(user._id == userId){
                    users.remove(user);
                }
            });
        }
}
})();