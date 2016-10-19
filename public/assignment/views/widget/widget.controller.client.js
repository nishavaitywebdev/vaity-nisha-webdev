/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function checkSafeHtml(html){
            return $sce.trustAsHtml(html);
        }
        function checkSafeYoutubeUrl(url){
            var parts = url.split("/");
            var id  = parts[parts.length - 1];
            var url = "https://www.youtube.com/embed/"+id; //check proper url and syntax
            return $sce.trustAsResourceUrl(url);

        }
        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }
    }
    function NewWidgetController() {
        var vm = this;
    }
    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.widget = $routeParams.widget;
        function init(){
            vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
            //console.log(vm.widgets);
        }
        init();
    }
})();