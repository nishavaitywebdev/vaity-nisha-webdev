/**
 * Created by nishavaity on 10/24/16.
 */
(function(){
    angular
        .module(WebAppMaker)
        .controller("RegisterController", RegisterController)

    function RegisterController(UserService){
        var vm = this;
        vm.register = register;

        function register(username,password) {
             UserService
                 .createUser(username, password);

        }

    }
})