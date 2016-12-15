/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/makeYouTour"); ///check
    // mongoose.connect("mongodb://nisha:nisha@ec2-35-165-104-34.us-west-2.compute.amazonaws.com:27017/dummyDB");
    // console.log("Inside model server js");
    var userModel = require("./user/user.model.server")();
    // var websiteModel = require("./website/website.model.server")();
    // var pageModel = require("./page/page.model.server")();
    // var widgetModel = require("./widget/widget.model.server")();
    var model = {
        userModel:userModel  //,
        // websiteModel:websiteModel,
        // pageModel:pageModel,
        // widgetModel:widgetModel
    };
    // websiteModel.setModel(model);
    // pageModel.setModel(model);
    userModel.setModel(model);
    // widgetModel.setModel(model);
    return model;

};