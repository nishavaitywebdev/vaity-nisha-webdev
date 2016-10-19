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
            function login(user) {
                user = UserService.findUserByCredentials(user.username, user.password);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            }
        }
        function RegisterController() {
            var vm = this;
            vm.register = register;
            function register(user) {
                if(user) {
                    UserService.createUser(user);
                    $location.url("/user/" + user._id);
                } else {
                    vm.alert = "Unable to login";
                }
            }
        }
        function ProfileController($routeParams, UserService) {
            var vm = this;

            vm.userId = $routeParams["userId"];
            function init() {
                vm.user = UserService.findUserById(vm.userId);
            }
            init();
        }
})();