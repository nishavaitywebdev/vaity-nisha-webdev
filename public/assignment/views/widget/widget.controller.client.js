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
        var pageId;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(pageId);
        }
        init();
    }
    function NewWidgetController() {
        var vm = this;
    }
    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        var widgetId;
        var widget;
        function init() {
            WidgetService.updateWidget(widgetId, widget);
        }
    }
})();