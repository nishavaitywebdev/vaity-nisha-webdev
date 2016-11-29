/**
 * Created by nishavaity on 11/26/16.
 */
module.exports =function () {
    var mongoose = require("mongoose");
    var WidgetSchema = require("../widget/widget.schema.server")(mongoose);
    var PageSchema = mongoose.Schema({
        _website:{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: String,
        title: String,
        description: String,
        widgets : [{type : mongoose.Schema.Types.ObjectId, ref : 'WidgetModel' }],
        dateCreated: {type: Date, default: Date.now}

    }, {collection: 'page'})

    return PageSchema;
    //var WebsiteSchema = require("./website.schema.server")();
};