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
        website._user = userId;
        return WebsiteModel.create(website)
            .then(function (websiteObj) {
                model.userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                            websiteObj._user = userObj._id;
                            websiteObj.save();
                            userObj.websites.push(websiteObj);
                            return userObj.save();
                        },
                        function(error){
                            console.log(error);
                        });
            });
    }

    function setModel(_model) {
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