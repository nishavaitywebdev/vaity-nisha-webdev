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
                //vm.alert = "";
                if(!username){
                    vm.alert = "";
                }
                else if(!password){
                    vm.alert = "";
                }
                else if (!username && !password){
                    vm.alert = "Username and Password required";
                }
                else{
                    var promise = UserService.login(username, password);
                    //console.log(username);
                    //var promise = UserService.findUserByCredentials(username,password);
                    promise
                        .success(function (user) {
                            console.log("Inside success of login")

                            if (user === '0') {
                                vm.alert = "No such user";
                            }
                            else {
                                $location.url("user/" + user._id);
                            }
                        })
                        .error(function () {
                            vm.alert = "No such user";
                            console.log("Inside error of login")
                        });
                }

            }
        }
        function RegisterController($scope,$rootScope,$location,UserService) {
            var vm = this;

            vm.createUser = createUser;
            function createUser(user) {
                console.log($scope.register);
                if(!$scope.register.$invalid && user.password == user.veryPassword){
                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            });
                }
                else{
                    vm.veryPasswordAlert = "Passwords do not match";
                }
                // if(user == undefined)
                //     vm.alert = "Username and Password required. Re-enter password";
                // else {
                //     if (!user.username) {
                //         vm.alert = "Username required";
                //     }
                //     else if (!user.password) {
                //         vm.alert = "Password required";
                //     }
                //     else if (!user.veryPassword) {
                //         vm.alert = "Please re enter password required";
                //     }
                //     else if (user.veryPassword != user.password) {
                //         vm.alert = "Passwords do not match";
                //     }
                //     else if (!user.username && !user.password && !user.veryPassword) {
                //         vm.alert = "Username and Password required. Re-enter password";
                //     }
                //     else {
                //
                //         UserService
                //             .register(user)
                //             .then(
                //                 function (response) {
                //                     var user = response.data;
                //                     $rootScope.currentUser = user;
                //                     $location.url("/user/" + user._id);
                //                 });
                //
                //     }
                //
                // }
            }
        }


        function ProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            //console.log(vm.userId);
            function init() {
                UserService
                    //.findUserById(vm.userId)
                    .findCurrentUser()
                    .success(function(user){
                        if(user != null){
                            vm.user = user;
                            //console.log(vm.user);
                        }
                    })
                    .error(function(){

                    });
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;

            
            function logout() {
                UserService.logout()
                    .success(function () {
                        $location.url("/login");
                    })
            }
            function updateUser(userId,user){
                UserService.updateUser(userId,user)
                    .success(function(user){
                        //console.log(user);
                        if(user != '0'){
                            vm.user = user;

                        }

                    })
                    .error(function(){

                    });

            }

            function deleteUser(userId){

                UserService.deleteUser(userId)
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