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
    // app.get('/api/user?username=username&password=password',findUserByCredentials);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',updateUser);
    app.delete('/api/user/:userId',deleteUser);

        function createUser(req, res) {
            var user = req.body;
            user._id = (new Date().getTime());
            users.push(user);
            console.log(users);
            res.send(200);

        }

        function findUser(req, res){
            var params = req.params;
            var query = req.query;
            if(query.password && query.username){
                findUserByCredentials(req, res);
            } else if (query.username){
                findUserByUsername(req, res);
            }
            console.log(params);
            console.log(query);
            res.send(users);
        }


        function findUserByUsername(req,res) {

            var user,username;
            username = req.query.username;
            for( var u in users){
                if(users[u].username === username){
                    user = users[u];
                    res.send(user);
                    return;
                }
            }
            res.send('0');
        }
        function findUserByCredentials(req,res) {

            var user, username, password;
            username = req.username;
            password = req.password;
            for( var u in users){
                if(users[u].username === username && users[u].password === password){
                    user = users[u];
                    res.send(user);
                    return;
                }
            }
            res.send('0');
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

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users){
            if(users[u]._id == uid){
                users[u] = user;
            }
        }
        res.send('0');
    }

    function deleteUser(req, res){
        var uid = req.params.uid;
        for(var u in users){
            if(users[u]._id == uid){
                users.splice(u, 1);
                break;
            }
        }
        res.send('0');
    }
}