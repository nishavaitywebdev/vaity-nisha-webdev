/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WidgetService,$sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        function init() {
            //console.log(vm.pageId)
            var promise = WidgetService.findWidgetsByPageId(vm.pageId);
            promise
                .success(function (widgets) {
                vm.widgets = widgets;
                    // var widgets = $(".wam-widgets")
                    //     .sortable({
                    //     axis: 'y'
                    // });
                })
                .error(function(){

                });
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
    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        //vm.widgetId = $routeParams.wgid;
        vm.createNewWidget = createNewWidget;
        function createNewWidget(widget) {

            var promise = WidgetService.createWidget(vm.pageId,widget);
            promise
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
                })
                .error(function(){

                });


        }
        function init() {
            var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            id = id.substring(-2);
            widget._id = id.toString();
            WidgetService.createWidget(vm.pageId,widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+widget._id);
            // var promise = WidgetService.findWidgetById(vm.widgetId);
            // promise
            //     .success(function (widget) {
            //         vm.widget = widget;
            //
            //
            //     })
            //     .error(function(){
            //
            //     });
        }
        //init();
    }
    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            //console.log(vm.pageId)
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise
                .success(function (widget) {
                    vm.widget = widget;


                })
                .error(function(){

                });
        }
        init();
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget(widget) {
            //console.log(widget);

            var promise = WidgetService.updateWidget(vm.widgetId,widget);
            promise
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function(){

                });


            //vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        }

        function deleteWidget(widgetId){

            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function(){

                });

            // vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();