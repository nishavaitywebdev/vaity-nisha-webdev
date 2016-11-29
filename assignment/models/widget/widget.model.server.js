/**
 * Created by nishavaity on 11/26/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    //var PageSchema = require("../page/page.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    //var PageModel = mongoose.model("PageModel", PageSchema);
    var model = {};
    // var UserModel = mongoose.model("UserModel",UserSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        sortWidgets: sortWidgets,
        setModel: setModel
    };
    return api;

    function createWidget(pageId,widget){
        //widget._page = pageId;
        return WidgetModel.create(widget)
            .then(function(widgetObject){
                return model.pageModel.findPageById(pageId)
                    .then(function(pageObject){
                            widgetObject._page = pageObject._id;
                            widgetObject.save();
                            pageObject.widgets.push(widgetObject);
                            pageObject.save();
                            return widgetObject.save();

                        },
                        function(error){
                            console.log(error);
                        });
            });
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
        var pageId;
        return model.widgetModel.findWidgetById(widgetId)
            .then(function (widgetObj) {
                pageId = widgetObj._page;
                    model.pageModel.findPageById(pageId)
                        .then(function (pageObj) {
                            //console.log(widgetId);
                            for(var w in pageObj.widgets){
                                //console.log(pageObj.widgets[w].toString());
                                if(pageObj.widgets[w].toString() == widgetId.toString()){
                                    //console.log("Matched");
                                    pageObj.widgets.splice(w,1);
                                    pageObj.save();
                                    break;
                                }
                            }
                                return WidgetModel.remove(
                                    {
                                        _id: widgetId
                                    }
                                );
                        },
                        function (err) {
                            console.log(err);
                        })
            },
            function (err) {
                console.log(err);
            })


    }
    function sortWidgets(pageId, start, end) {
        //console.log(pageId);
        return model.widgetModel.findAllWidgetsForPage(pageId)
            .then(function (widgetsForPage) {
                console.log(widgetsForPage.length);
                for(var wp in widgetsForPage){
                    //console.log(widgetsForPage[wp]._id.toString());
                    return model.widgetModel.remove({_id:widgetsForPage[wp]._id})

                }
                console.log(widgetsForPage.length);
                var widget = widgetsForPage.splice(start,1)[0];
                widgetsForPage.splice(end,0, widget);
                console.log("After splice");
                return model.widgetModel.insert(widgetsForPage).save();
            });

                //console.log(page.widgets);

            // model
            // .pageModel
            // .findPageById(pageId)
            // .then(function (page) {
            //     console.log(page.widgets);
            //     var widget = page.widgets.splice(start,1)[0];
            //     page.save();
            //     page.widgets.splice(end,0,widget);
            //     page.save();
            //     console.log(page.widgets);
            //     return page.save();
            // },
            // function (error) {
            //     console.log(error);
            // });
        // var start = req.query.start;
        // var stop = req.query.end;
        // widgets.splice(stop,0,widgets.splice(start,1)[0]);
        // //console.log(widgets);
    }

    function setModel(_model) {
        model = _model;
    }


};