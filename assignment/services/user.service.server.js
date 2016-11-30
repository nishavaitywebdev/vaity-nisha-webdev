/**
 * Created by nishavaity on 10/24/16.
 */

module.exports = function(app,model){
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
            // user._id = (new Date().getTime()).toString();
            // user.push(user);
            model.userModel.createUser(user)
                .then(
                    function (newuser) {
                        res.send(newuser);
                    },
                    function (error) {
                        res.sendStatus(400).send("Error");
                    }
                );


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
            //res.send(user);
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
            // for( var u in user){
            //     //console.log(user[u]);
            //     if(user[u].username === username && user[u].password === password){
            //         user = user[u];
            //         res.send(user);
            //         return;
            //     }
            // }

            model
                .userModel
                .findUserByCredentials(username, password)
                .then(
                    function (user) {
                        if(user)
                            res.json(user);
                        else
                            res.send('0');
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
            //res.send('0');
        }

    function findUserById(req,res) {
        //console.log("Inside ind user by id")
        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    console.log(user);
                    if(user)
                        res.send(user);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.userId;
        console.log(uid);
        model
            .userModel
            .updateUser(uid, user)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            })
        // for(var u in user){
        //     if(user[u]._id == uid.toString()){
        //         user[u] = user;
        //     }
        // }
        res.send('0');
    }

    function deleteUser(req, res){
        var uid = req.params.userId;
        model.userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
        // for(var u in user){
        //     if(user[u]._id == uid.toString()){
        //         user.splice(u, 1);
        //         res.send(200);
        //     }
        // }
        //res.send('0');
    }
}