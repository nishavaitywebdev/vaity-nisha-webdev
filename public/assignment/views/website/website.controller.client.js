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
    }
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        var website;
        var websiteId;
        function init() {
            WebsiteService.updateWebsite(websiteId,website);
        }
    }
})();