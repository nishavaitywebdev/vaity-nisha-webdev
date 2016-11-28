/**
 * Created by nishavaity on 11/17/16.
 */
module.exports = function () {
    var model ={};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);
    // var UserModel = mongoose.model("UserModel",UserSchema);
    var api = {
        createWebsite : createWebsite,
        findWebsitesForUser:findWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        setModel:setModel
    };
    return api;
    
    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }
    
    function createWebsite(userId, website) {
        website.developerId = userId;
        return WebsiteModel.create(website);
            // .then(function (websiteObj) {
            //     model.userModel
            //         .findUserById(userId)
            //         .then(function (userObj) {
            //             userObj.websites.push(websiteObj);
            //             return userObj.save();
            //         })
            // });
    }

    function setModel() {
        model = _model;
    }
    function findWebsitesForUser(userId) {
        return WebsiteModel.find({
            _user:userId
        });
    }

    function updateWebsite(websiteId, website) {
        //console.log(website);
        return WebsiteModel.update(
            {
                _id: websiteId
            },
            {
                $set: website
            }
        );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove(
            {
                _id: websiteId
            }
        );
    }
    
}