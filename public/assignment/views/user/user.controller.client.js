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
            var user_new = vm.user;
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
                vm.user = UserService.findUserById(vm.userId);
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;

            function updateUser(){
                var promise = UserService.updateUser(vm.userId,vm.user);
                promise
                    .success(function(user){
                        $location.url("user/" + user._id);
                        })
                    .error(function(){

                    });
                //console.log(vm.userId);
                // UserService.updateUser(vm.userId,vm.user);
                // vm.user = UserService.findUserById(vm.userId);
                // //console.log(vm.user)
                // $location.url("/user/"+vm.userId);
            }

            function deleteUser(userId){

                var promise = UserService.deleteUser(vm.userId);
                promise
                    .success(function(userId){
                        $location.url("/login");
                    })
                    .error(function(){

                    });
                // console.log(UserService.deleteUser(vm.userId));
                // $location.url("/login");
            }
        }
})();