/**
 * Created by nishavaity on 10/13/16.
 */
(function () {
    angular
        .module ("WebAppMakerApp")
        .controller("LoginController",LoginController)
    function LoginController($location) {
        var vm = this;
        vm.login = function(username,password){
            console.log([username, password]);
            var users = {username:"bob",password:"ex"};
        }
    }
})();