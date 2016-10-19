/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
    function EditPageController($routeParams, PageService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.page = $routeParams.page;
        vm.websiteId = $routeParams.websiteId;
        vm.updatePage = updatePage(vm.pageId, vm.page);
        vm.deletePage = deletePage(vm.pageId);

        function updatePage(pageId, page) {
            PageService.updatePage(pageId, page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        function deletePage(pid){
            PageService.deletePage(pid);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
    }
    function PageListController() {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        function init() {
            vm.pages = WidgetService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
    function NewPageController() {
        var vm = this;
        vm.websiteId = $routeParams.websiteId;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.page = $routeParams.page;
        vm.createPage = createPage;

        function createPage() {
            var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            id = id.substring(-2);
            vm.page._id = id;
            PageService.createPage(vm.websiteId,vm.page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
    }
})();