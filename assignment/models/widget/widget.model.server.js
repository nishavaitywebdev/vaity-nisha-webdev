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
        delAddWidgetsOfPage:delAddWidgetsOfPage,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;


    function delAddWidgetsOfPage(pageId, widgets) {
        //console.log("del add widgets");
        return model.pageModel.update({
            _id:pageId
        },{widgets:[]})
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
        //widget._page = pageId;
        return WidgetModel.create(widget)
            .then(function (widgetObject) {
                return model.pageModel.findPageById(pageId)
                    .then(function (pageObject) {
                            widgetObject._page = pageObject._id;
                            widgetObject.save();
                            pageObject.widgets.push(widgetObject);
                            pageObject.save();
                            return widgetObject.save();

                        },
                        function (error) {
                            console.log(error);
                        });
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({
            _page: pageId
        });
    }

    // return model.pageModel.findPageById({
    //     _id: pageId
    // })
    //     .then(function (page) {
    //         var widgets = [];
    //         //console.log(page.widgets);
    //         for (var w =0; w< page.widgets.length; w++){
    //             model.widgetModel.findWidgetById(page.widgets[w])
    //                 .then(function (wig) {
    //                     widgets.push(wig);
    //                 },
    //                 function (err) {
    //                     console.log(err)
    //                 });
    //             //widgets.push(model.widgetModel.findWidgetById(page.widgets[w]));
    //         }
    //         return widgets;
    //     },
    //     function (err) {
    //         console.log(err);
    //     });
    //console.log(widgets);
    //return widgets;
//}

    function reorderWidget(pageId, start, end) {
        //console.log("Inside widget model sort: "+ pageId);
        return model.pageModel.reorderWidgetForPage(pageId, start, end);
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
        return model
        .widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            //console.log("In sort widgets");
            var widget = widgets.splice(start,1)[0];
            widgets.splice(end,0,widget);
            //console.log(widgets);
            return model.widgetModel.delAddWidgetsOfPage(pageId, widgets)
                .then(function (status) {
                    console.log("Inside success of del add widgets");
                },
                function (err) {
                    console.log("errored after del add widgets")
                });
        },
        function (error) {
            console.log(error);
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