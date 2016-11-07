/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.websiteId = $routeParams["wid"];
        //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        //vm.page = PageService.findPageById(vm.pageId);
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                })
            var promise1 = PageService.findPageById(vm.pageId);
            promise1
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {

                })


        }
        init();
        function updatePage(pageId, page) {
            var promise = PageService.updatePage(pageId, page);
            promise
                .success(function (websiteId) {
                    $location.url("/user/"+ vm.userId+"/website/"+ websiteId+"/page");
                    })
                .error(function(){

                });
            //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        function deletePage(pid){
            var promise = PageService.deletePage(pid);
            promise
                .success(function (websiteId) {
                    if(websiteId != '0'){
                        $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page");
                    }
                })
                .error(function(){

                });
            //vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
    }
    function PageListController($routeParams,PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        //console.log(vm.websiteId)
        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                })

        }
        init();
    }
    function NewPageController($routeParams,PageService,$location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        //console.log(vm.pages)
        vm.createPage = createPage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {

                })


        }
        init();

        function createPage(websiteId,page) {

            var promise = PageService.createPage(websiteId,page);
            promise
                .success(function(websiteId){
                    if(websiteId != ''){
                        $location.url("/user/"+vm.userId+"/website/"+websiteId+"/page");
                    }
                })
                .error(function(){

                });

            // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            // id = id.substring(-2);
            // PageService.createPage(websiteId,page,id);
            // vm.pages = PageService.findPageByWebsiteId(websiteId);
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            // //console.log(vm.pages)
        }
    }
})();