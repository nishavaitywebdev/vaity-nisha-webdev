/**
 * Created by nishavaity on 10/24/16.
 */

var express = require('express');
var app = express();

module.exports = function (app) {
    require("./services/user.service.server.js")(app);
}