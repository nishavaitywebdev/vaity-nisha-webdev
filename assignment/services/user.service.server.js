/**
 * Created by nishavaity on 10/24/16.
 */

module.exports = function(app){
    var users = [
        {_id: "123", email:"alice@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", email:"bob@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", email:"charly@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", email:"jannunzi@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //console.log("Inside user service server js");
    app.get('/api/user', findUser);
    // app.get('/api/user?username=username&password=password',findUserByCredentials);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',updateUser);
    app.delete('/api/user/:userId',deleteUser);

        function createUser(req, res) {
            var user = req.body;
            user._id = (new Date().getTime()).toString();
            users.push(user);
            //console.log(users);
            res.send(user);

        }

        function findUser(req, res){
            //console.log("Inside find user")
            var params = req.params;
            var query = req.query;
            //console.log(query);
            if(query.password && query.username){
                //console.log("In if of creds");
                findUserByCredentials(req, res);
            } else if (query.username){
                //console.log("In if of username");
                findUserByUsername(req, res);
            }
            // console.log(params);
            // console.log(query);
            //res.send(users);
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
            username = req.query.username;
            password = req.query.password;
            //console.log(username);
            //console.log(password);
            for( var u in users){
                //console.log(users[u]);
                if(users[u].username === username && users[u].password === password){
                    user = users[u];
                    res.send(user);
                    return;
                }
            }
            res.send('0');
        }

    function findUserById(req,res) {
        //console.log("Inside ind user by id")
        var userId = req.params.userId;
        for( var u in users){
            //console.log(users[u]);
            if(users[u]._id === userId.toString()){
                user = users[u];
                res.send(user);
            }
        }
        //res.send('0');
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.userId;
        for(var u in users){
            if(users[u]._id == uid.toString()){
                users[u] = user;
            }
        }
        res.send('0');
    }

    function deleteUser(req, res){
        var uid = req.params.userId;
        for(var u in users){
            if(users[u]._id == uid.toString()){
                users.splice(u, 1);
                res.send(200);
            }
        }
        //res.send('0');
    }
}