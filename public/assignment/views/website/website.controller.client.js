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
        console.log(vm.userId);
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();
    }
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();

        function createWebsite(userId, website) {

            var promise = WebsiteService.createWebsite(userId, website);
            promise
                .success(function(user){
                    $location.url("/user/"+ user._id+"/website");
                })
                .error(function(){

                });

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
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise
                .success(function(websites){
                    vm.websites = websites;
                })
                .error(function(){

                });
        }
        init();

        function updateWebsite(websiteId, website) {

            var promise = WebsiteService.updateWebsite(websiteId, website);
            promise
                .success(function(userId){
                   if(userId != '0'){
                       $location.url("/user/"+ user._id+"/website");
                   }
                })
                .error(function(){

                });
                // WebsiteService.updateWebsite(vm.websiteId, vm.website);
                // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
                // $location.url("/user/"+vm.userId+"/website");
        }
        function deleteWebsite(websiteId) {

            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .success(function(userId){
                    if(userId != '0'){
                        $location.url("/user/"+ user._id+"/website");
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