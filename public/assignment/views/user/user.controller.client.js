/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(username,password){
                // console.log(username);
                // console.log(password);
                var promise = UserService.findUserByCredentials(username,password);
                promise
                    .success(function(user){
                        if(user === '0'){
                            vm.alert = "No such user";
                        }
                        else{
                            $location.url("user/" + user._id);
                        }
                    })
                    .error(function(){

                    });

            // function login(username, password) {
            //     var user = UserService.findUserByCredentials(username, password);
            //     if(user) {
            //         $location.url("user/" + user._id);
            //     } else {
            //         vm.alert = "Incorrect login";
            //     }
            }
        }
        function RegisterController($location,UserService) {
            var vm = this;
            vm.createUser = createUser;
            //var user_new = vm.user;
            //console.log(vm.user)
            function createUser(user) {
                //console.log(user)
                UserService
                    .createUser(user)
                    .success(function(user){
                    $location.url("user/"+user._id);
                })
                    .error(function(){
                        console.log("Error")
                    })

            }
        }
        function ProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            console.log(vm.userId);
            function init() {
                var promise = UserService.findUserById(vm.userId);
                promise
                    .success(function(user){
                        if(user != '0'){
                            vm.user = user;

                        }
                    })
                    .error(function(){

                    });
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;

            function updateUser(userId,user){
                var promise = UserService.updateUser(userId,user);
                promise
                    .success(function(user){
                        if(user != '0'){
                            vm.user = user;

                        }

                    })
                    .error(function(){

                    });

            }

            function deleteUser(userId){

                var promise = UserService.deleteUser(userId);

                promise
                    .success(function(response){
                        if(response == 'OK'){
                            $location.url("/login");
                        }
                    })
                    .error(function(){

                    });


            }
        }
})();