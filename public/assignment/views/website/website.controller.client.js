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
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        vm.createWebsite = createWebsite;
        function createWebsite(website) {
            var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            id = id.substring(-2);
            website.developerId = vm.userId;
            website._id = id.toString();
            WebsiteService.createWebsite(website);
            $location.url("/user/"+vm.userId+"/website");
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
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, vm.website);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();