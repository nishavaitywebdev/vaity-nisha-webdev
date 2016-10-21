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

            function login(username, password) {
                var user = UserService.findUserByCredentials(username, password);
                if(user) {
                    $location.url("user/" + user._id);
                } else {
                    vm.alert = "Incorrect login";
                }
            }
        }
        function RegisterController($routeParams, UserService,$location) {
            var vm = this;
            vm.register = register;
            function register(user) {
                var id = (Math.floor(100000 + Math.random() * 900000)).toString();
                id = id.substring(-2);
                user._id = id;
                if(user) {
                    UserService.createUser(user);
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            }
        }
        function ProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            //console.log(vm.userId);
            function init() {
                vm.user = UserService.findUserById(vm.userId);
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;

            function updateUser(userId,user){
                UserService.updateUser(userId,user);
                vm.user = UserService.findUserById(userId);
                $location.url("/login");
            }

            function deleteUser(userId){
                console.log(UserService.deleteUser(vm.userId));
                $location.url("/login");
            }
        }
})();