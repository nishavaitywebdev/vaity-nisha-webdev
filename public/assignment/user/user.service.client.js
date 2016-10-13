/**
 * Created by nishavaity on 10/13/16.
 */
(function () {
    angular
        .module ("WebAppMakerApp")
        .factory("UserService", UserService)
    function UserService(){
            var vm = this;
            vm.login = login;
    }
})();