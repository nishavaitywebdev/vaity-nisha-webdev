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
        var pageId;
        var page;
        function init() {
            PageService.updatePage(pageId, page);
        }
    }
    function PageListController() {
        var vm = this;
        var websiteId;
        function init() {
            vm.pages = WidgetService.findPageByWebsiteId(websiteId);
        }
        init();
    }
    function NewPageController() {
        var vm = this;
    }
})();