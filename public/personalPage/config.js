/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("PersonalPageApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/personal", {
                templateUrl: "/personalPage/views/personal.view.html",
                controller: "PersonalController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo : "/login"
            });
    }
})();