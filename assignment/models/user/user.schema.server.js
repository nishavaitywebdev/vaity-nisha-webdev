/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [WebsiteSchema],
        dateCreated: {type: Date, default: Date.now}
    },{collection:"user"});
    return UserSchema;
}