/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var WidgetModel = model.widgetModel;

    var widgets = [
        // { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
        // { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        // { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //     "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        // { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
        // { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        // { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //     "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        // { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},

        //user alice- testing
        { "_id": "121", "widgetType": "HEADER", "pageId": "3221", "size": 1, "text": "GIZMODO"},
        { "_id": "241", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        { "_id": "451", "widgetType": "IMAGE", "pageId": "3221", "width": "100%",
            "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        { "_id": "41", "widgetType": "HTML", "pageId": "3221", "text": " It is a viral video recorded by the Scottish actor Peter Capaldi (pictured) and sent to Thomas Goodall, an autistic nine-year-old who was grieving over the death of his grandmother. Thomas's father Ross posted the video to YouTube on 6 November 2014 so that his whole family could see it, but the video had wide appeal, and was viewed more than 200,000 times over the next 48 hours. Less than a week later it had over 900,000 "},
        { "_id": "561", "widgetType": "HEADER", "pageId": "3221", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        { "_id": "67", "widgetType": "YOUTUBE", "pageId": "3221", "width": "100%",
            "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        { "_id": "78", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"}
        // //
        // //user
        // { "_id": "1232", "widgetType": "HEADER", "pageId": "4312", "size": 1, "text": "GIZMODO"},
        // { "_id": "2342", "widgetType": "HEADER", "pageId": "4312", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        // { "_id": "3452", "widgetType": "IMAGE", "pageId": "4312", "width": "100%",
        //     "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        // { "_id": "4562", "widgetType": "HTML", "pageId": "4312", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
        // { "_id": "5672", "widgetType": "HEADER", "pageId": "4312", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        // { "_id": "6782", "widgetType": "YOUTUBE", "pageId": "4312", "width": "100%",
        //     "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        // { "_id": "7892", "widgetType": "HTML", "pageId": "4312", "text": "<p>Lorem ipsum</p>"}


    ];


    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/assignment", sort);

    function sort(req,res) {
        var start = req.query.start;
        var stop = req.query.end;
        widgets.splice(stop,0,widgets.splice(start,1)[0]);
        //console.log(widgets);
    }

    function createWidget(req,res){
        var pageId = req.params.pageId;
        var widget = req.body;
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);

        widget._id = id;
        widget.pageId = pageId.toString();
        //website.developerId = userId;
        widgets.push(widget);
        res.send(widget);
    }

    function findWidgetById(req, res){
       // var widget;
        var widgetId = req.params.widgetId;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                    //console.log(website);
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateWidget(req, res){
        var widget = req.body;
        //console.log(widget);
        var widgetId = req.params.widgetId;
        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function (data) {
                    //console.log(website);
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        WidgetModel
            .deleteWidget(widgetId)
            .then(
                function(data) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pid;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for (var w in widgets){
            if(widgets[w]._id == widgetId){
                widgets[w].width = width;
                widgets[w].url = "/assignment/uploads/" + filename;

                var pageId = widgets[w].pageId;

                res.redirect("/assignment/#/user/" + userId + "/website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId);
            }
        }
    }


};