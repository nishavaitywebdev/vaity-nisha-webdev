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
        var userId = $routeParams["userId"];
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(userId);
        }
        init();
    }
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        //var vm.userId = $routeParams["userId"];
        var website;
        function init() {
            WebsiteService.createWebsite(website);
        }
        init();
    }
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.websiteId = $routeProvider.websiteId;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.websiteId, website);
        }
        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
        }
    }
})();