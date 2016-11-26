/**
 * Created by nishavaity on 11/26/16.
 */
module.exports =function () {
    var mongoose = require("mongoose");
    //var WidgetSchema = require("../page/page.schema.server")(mongoose);
    var WidgetSchema = mongoose.Schema({
        type: {type:String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: {type: String, required: true},
        pageId:{type: mongoose.Schema.ObjectId, ref: "PageModel"},
        text: String,
        size: Number

    }, {collection: 'widget'})

    return WidgetSchema;
    //var WebsiteSchema = require("./website.schema.server")();
};