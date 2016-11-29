/**
 * Created by nishavaity on 11/17/16.
 */
module.exports =function () {
    var mongoose = require("mongoose");
    var PageSchema = require("../page/page.schema.server")(mongoose);
    var WebsiteSchema = mongoose.Schema({
        _user:{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        pages : [{type : mongoose.Schema.Types.ObjectId, ref : 'PageModel'}],
        dateCreated: {type: Date, default: Date.now}

    }, {collection: 'website'})

    return WebsiteSchema;

    //var WebsiteSchema = require("./website.schema.server")();
}