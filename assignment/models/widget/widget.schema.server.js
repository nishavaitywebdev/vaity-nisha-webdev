/**
 * Created by nishavaity on 11/26/16.
 */
module.exports =function () {
    var mongoose = require("mongoose");
    //var WidgetSchema = require("../page/page.schema.server")(mongoose);
    var WidgetSchema = mongoose.Schema({
        widgetType: {type:String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        name: String,
        _page:{type: mongoose.Schema.ObjectId, ref: "PageModel"},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'widget'})

    return WidgetSchema;
    //var WebsiteSchema = require("./website.schema.server")();
};