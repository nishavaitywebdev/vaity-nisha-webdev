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
            var promise = WidgetService.findWidgetByPageId(vm.pageId);
            promise
                .success(function (widgets) {
                    console.log(widgets);
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
        function checkSafeYoutubeUrl(url1){
            var parts = url1.split("/");
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
        vm.pageId = $routeParams.pid.toString();
        //vm.widgetId = $routeParams.wgid;
        vm.createNewWidget = createNewWidget;
        function createNewWidget(widget) {
            //console.log(widget);
            var promise = WidgetService.createWidget(vm.pageId,widget);
            promise
                .success(function(widget){
                    //console.log(widget);
                    if(widget != null){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+widget._page+"/widget/"+ widget._id);
                    }
                })
                .error(function(error){
                    console.log(error);
                });


        }
        // function init() {
        //     var promise = WidgetService.findWidgetById(vm.widgetId);
        //
        //     promise
        //         .success(function(widget){
        //             if(widget != '0'){
        //                 vm.widget = widget;
        //             }
        //
        //         })
        //         .error(function(){
        //
        //         });
        // }
        // init();
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

        function updateWidget(widgetId,widget){
            //console.log(widget);
            var promise = WidgetService.updateWidget(widgetId,widget);

            promise
                .success(function (data) {
                   //console.log(vm.pageId);
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function(error){
                    console.log(error);
                });


            //vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);

        }

        function deleteWidget(widgetId){

            var promise = WidgetService.deleteWidget(widgetId);
            promise
                .success(function (data) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function(){

                });

            // vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();