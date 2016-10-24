/**
 * Created by nishavaity on 10/24/16.
 */

module.exports = function (app) {
    var users = [
        {_id: "123", email:"alice@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", email:"bob@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", email:"charly@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", email:"jannunzi@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);

        function createUser() {
            var user = req.body;
            user._id = (new Date().getTime());

        }

        function findUser(req, res){
            var params = req.params;
            var query = req.query;
            if(query.password && query.username){
                findUserByUserName(req, res);
            } else if (query.username){

            }
            console.log(params);
            console.log(query);
            res.send(users);
        }


        function findUserByUsername(username) {

            users.forEach(function(user){
                if(user.username == username){
                    return user;
                }
            });
        }
        function findUserByCredentials(username, password) {

            var user;
            for( var u in users){
                if(users[u].username === username && users[u].password === password){
                    user = users[u];
                    break;
                }
            }
            return user;
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
}