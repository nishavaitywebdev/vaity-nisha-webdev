/**
 * Created by nishavaity on 11/26/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var model = {};
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        delAddWidgetsOfPage:delAddWidgetsOfPage,
        sortWidget: sortWidget,
        setModel: setModel
    };
    return api;


    function delAddWidgetsOfPage(pageId, widgets) {
        //console.log("del add widgets");
        return model.pageModel.updatePage(pageId,{
            "name" : "page4",
            "title" : "page4",
            "_website" : ObjectId("583cc6071a52590d99ff3c65"),
            "dateCreated" : ISODate("2016-11-29T05:01:35.401Z"),
            "widgets" : [
            ]
        })
            .then(function (status) {
                console.log("updated page widgets");
                return model.widgetModel.remove({
                    _page:pageId
                }).then(function (status) {
                    console.log("Removed page widgets");
                    for(var w in widgets){
                        delete widgets.widgets[w]._id;
                        delete widgets.widgets[w]._page;
                        return model.widgetModel.createWidget(pageId, widgets[w]);
                        console.log("Added page widget");
                    }
                }, function (err) {
                    console.log(err);
                })
            }, function (err) {
                console.log(err);
            })
    }

    function createWidget(pageId, widget) {

        widget.dateCreated = new Date();
        widget._page = pageId;
        return WidgetModel
            .create(widget)
            .then(function (widgetObj) {
                return widgetObj;
            });

    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }


    function sortWidget(pageId, start, end) {
        return model.pageModel.sortWidgetForPage(pageId, start, end);
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
    // function sortWidgets(pageId, start, end) {
    //     //console.log(pageId);
    //     return model
    //     .widgetModel
    //     .findAllWidgetsForPage(pageId)
    //     .then(function (widgets) {
    //         //console.log("In sort widgets");
    //         var widget = widgets.splice(start,1)[0];
    //         widgets.splice(end,0,widget);
    //         //console.log(widgets);
    //         return model.widgetModel.delAddWidgetsOfPage(pageId, widgets)
    //             .then(function (status) {
    //                 console.log("Inside success of del add widgets");
    //             },
    //             function (err) {
    //                 console.log("errored after del add widgets")
    //             });
    //     },
    //     function (error) {
    //         console.log(error);
    //     });
    // }

    function setModel(_model) {
        model = _model;
    }


};