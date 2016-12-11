/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("MakeYourTourApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "/project/views/user/homepage.html",
                controller: "HotelListController",
                controllerAs: "model"
            })
            .when("/hotelDetails/:hid",{
                templateUrl: "/project/views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model"
            })
            .when("/hotel", {
                templateUrl: "/project/views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "/project/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/project/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "/project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "/project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .otherwise({
                redirectTo : "/home"
            });
        
        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }

                });
            return deferred._promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }

                });
            return deferred._promise;
        }
    }
})();