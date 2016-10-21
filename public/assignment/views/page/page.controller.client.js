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
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.websiteId = $routeParams["wid"];
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.page = PageService.findPageById(vm.pageId);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage(pageId, page) {
            PageService.updatePage(pageId, page);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        function deletePage(pid){
            PageService.deletePage(pid);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
    }
    function PageListController($routeParams,PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        console.log(vm.websiteId)
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        }
        init();
    }
    function NewPageController($routeParams,PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        console.log(vm.pages)
        vm.createPage = createPage;

        function createPage(websiteId,page) {
            var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            id = id.substring(-2);
            PageService.createPage(websiteId,page,id);
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            //console.log(vm.pages)
        }
    }
})();