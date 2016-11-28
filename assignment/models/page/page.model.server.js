/**
 * Created by nishavaity on 11/26/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    // var UserModel = mongoose.model("UserModel",UserSchema);
    var api = {
        createPage: createPage,
        findPagesForWebsite: findPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function setModel() {
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
        return PageModel.remove(
            {
                _id: pageId
            }
        );
    }


}