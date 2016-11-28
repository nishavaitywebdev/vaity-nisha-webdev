/**
 * Created by nishavaity on 11/26/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./Widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    // var UserModel = mongoose.model("UserModel",UserSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        sort: sort
    };
    return api;

    function createWidget(widget) {

        return WidgetModel.create(widget);
    }
    
    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({
            _page: pageId
        });
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById({
            _id: widgetId
        });
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {
                _id: widgetId
            },
            {
                $set: widget
            }
        );
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove(
            {
                _id: widgetId
            }
        );
    }
    function sort(widgetId, start, end) {
        // var start = req.query.start;
        // var stop = req.query.end;
        // widgets.splice(stop,0,widgets.splice(start,1)[0]);
        // //console.log(widgets);
    }

};