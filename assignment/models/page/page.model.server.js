/**
 * Created by nishavaity on 11/26/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findPagesForWebsite: findPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetToPage:addWidgetToPage,
        sortWidgetForPage:sortWidgetForPage,
        findAllWidgetsForPage:findAllWidgetsForPage,
        setModel: setModel
    };
    return api;

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function sortWidgetForPage(pageId, start, end) {
        return PageModel.findById(pageId)
            .then(function (pageObj) {
                var widgetsForPage = pageObj.widgets;
                pageObj.widgets.splice(parseInt(end), 0, pageObj.widgets.splice(parseInt(start), 1)[0]);
                PageModel.update({_id: pageId},{$set: {widgets: pageObj.widgets}})
                    .then(function (res) {
                    });
            });
    }

    function addWidgetToPage(pageId, widgetId) {
        return PageModel.update({_id: pageId},{$push:{widgets: widgetId}});
    }

    function findAllWidgetsForPage(pageId) {
        return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page)
            .then(function (pageObj) {
                model.websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                            pageObj._website = websiteObj._id;
                            pageObj.save();
                            websiteObj.pages.push(pageObj);
                            return websiteObj.save();
                        },
                        function(error){
                            console.log(error);
                        });
            });
    }

    function setModel(_model) {
        model = _model;
    }
    function findPagesForWebsite(websiteId) {
        return PageModel.find({
            _website:websiteId
        });
    }

    function updatePage(pageId,page) {
        return PageModel.update(
            {
                _id: pageId
            },
            {
                $set: page
            }
        );
    }

    function deletePage(pageId) {
         //

        var websiteId;
        return model.pageModel.findPageById(pageId)
            .then(function (pageObj) {
                    websiteId = pageObj._website;
                    model.websiteModel.findWebsiteById(websiteId)
                        .then(function (websiteObj) {
                                //console.log(widgetId);
                                for(var w in websiteObj.pages){
                                    if(websiteObj.pages[w].toString() == pageId.toString()){
                                        //console.log("Matched");
                                        websiteObj.pages.splice(w,1);
                                        websiteObj.save();
                                        break;
                                    }
                                }
                                return PageModel.remove(
                                    {
                                        _id: pageId
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

}