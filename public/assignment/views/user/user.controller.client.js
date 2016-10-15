/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        function LoginController() {
            var vm = this;
        }
        function RegisterController() {
            var vm = this;
        }
        function ProfileController($routeParams, UserService) {
            var vm = this;
            var userId = $routeParams["userId"];
            function init() {
                vm.user = UserService.findUserById(userId);
            }
            init();
        }
})();