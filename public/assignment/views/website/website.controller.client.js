/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        //console.log(vm.userId);
        function init() {
            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise
                .success(function(websites){
                    //console.log(websites);
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();
    }
    function NewWebsiteController($scope, $routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"].toString();
        //console.log(vm.userId);
        vm.websiteId = $routeParams.wid;
        //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();

        function createWebsite(userId, website) {
            //console.log(userId);
            if(website == undefined && !$scope.newWebsite.$invalid)
                vm.alert = "Website name required";
            else if (!website.name && !$scope.newWebsite.$invalid) {
                vm.errClass = "errClass";
                vm.errClassField = "errClassField";
                vm.alert = "Website name required";
            }
            else {
                var promise = WebsiteService.createWebsite(userId, website);
                promise
                    .success(function (data) {
                        $location.url("/user/" + userId + "/website");
                    })
                    .error(function () {

                    });
            }

            // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            // id = id.substring(-2);
            // website.developerId = vm.userId;
            // website._id = id.toString();
            // WebsiteService.createWebsite(website);
            // $location.url("/user/"+vm.userId+"/website");
        }

    }
    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        //vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        //vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsiteByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
            var promise1 = WebsiteService.findWebsiteById(vm.websiteId);
            promise1
                .success(function(website){
                    vm.website = website;
                })
                .error(function(){

                });
        }
        init();

        function updateWebsite(websiteId, website) {
            if(website == undefined)
                vm.alert = "Website name required";
            else if (!website.name) {
                vm.alert = "Website name required";
            }
            else {
                var promise = WebsiteService.updateWebsite(websiteId, website);
                promise
                    .success(function (data) {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {

                    });
            }
                // WebsiteService.updateWebsite(vm.websiteId, vm.website);
                // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
                // $location.url("/user/"+vm.userId+"/website");
        }
        function deleteWebsite(websiteId) {

            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .success(function(data){
                    if(data != '0'){
                        $location.url("/user/"+ vm.userId +"/website");
                    }
                })
                .error(function(){

                });


            // WebsiteService.deleteWebsite(vm.websiteId);
            // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            // $location.url("/user/"+vm.userId+"/website");
        }
    }
})();