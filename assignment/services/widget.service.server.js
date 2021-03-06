/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

    var WidgetModel = model.widgetModel;
   // var PageModel = model.pageModel;

    // var widgets = [
    //     // { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
    //     // { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
    //     // { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //     //     "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
    //     // { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
    //     // { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
    //     // { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //     //     "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
    //     // { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //
    //     //user alice- testing
    //     // { "_id": "121", "widgetType": "HEADER", "pageId": "3221", "size": 1, "text": "GIZMODO"},
    //     // { "_id": "241", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
    //     // { "_id": "451", "widgetType": "IMAGE", "pageId": "3221", "width": "100%",
    //     //     "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
    //     // { "_id": "41", "widgetType": "HTML", "pageId": "3221", "text": " It is a viral video recorded by the Scottish actor Peter Capaldi (pictured) and sent to Thomas Goodall, an autistic nine-year-old who was grieving over the death of his grandmother. Thomas's father Ross posted the video to YouTube on 6 November 2014 so that his whole family could see it, but the video had wide appeal, and was viewed more than 200,000 times over the next 48 hours. Less than a week later it had over 900,000 "},
    //     // { "_id": "561", "widgetType": "HEADER", "pageId": "3221", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
    //     // { "_id": "67", "widgetType": "YOUTUBE", "pageId": "3221", "width": "100%",
    //     //     "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
    //     // { "_id": "78", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"}
    //     // //
    //     // //user
    //     // { "_id": "1232", "widgetType": "HEADER", "pageId": "4312", "size": 1, "text": "GIZMODO"},
    //     // { "_id": "2342", "widgetType": "HEADER", "pageId": "4312", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
    //     // { "_id": "3452", "widgetType": "IMAGE", "pageId": "4312", "width": "100%",
    //     //     "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
    //     // { "_id": "4562", "widgetType": "HTML", "pageId": "4312", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
    //     // { "_id": "5672", "widgetType": "HEADER", "pageId": "4312", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
    //     // { "_id": "6782", "widgetType": "YOUTUBE", "pageId": "4312", "width": "100%",
    //     //     "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
    //     // { "_id": "7892", "widgetType": "HTML", "pageId": "4312", "text": "<p>Lorem ipsum</p>"}
    //
    //
    // ];


    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pid/widget",sortWidgets);
    app.get("/api/flickrImage", selectPhoto);

    function selectPhoto(photo) {
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        WidgetService
            .updateWidget(websiteId, pageId, widgetId, {url: url})
            .then();
    }



    function sortWidgets(req, res) {
        var pageId = req.params.pid;
        var start = req.query.start;
        var end = req.query.end;
        model.widgetModel
            .sortWidget(pageId, start, end);
        res.send('200');
    }


    function sort(req,res) {
        var pageId = req.params.pid;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        //console.log(pageId);
        WidgetModel
            .sortWidgets(pageId, start, end)
            .then(function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function createWidget(req,res){
        var widget = req.body;
        var pageId = req.params.pageId;

        return model.widgetModel.createWidget(pageId,widget)
            .then(function(widgetObj){
                    return model.pageModel
                        .addWidgetToPage(pageId, widgetObj._id)
                        .then(function (widgets) {
                            res.json(widgetObj);
                        });
                },
                function(error){
                    res.statusCode(400).send(error);
                });
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                    res.send(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateWidget(req, res){
        var widget = req.body;
        var widgetId = req.params.widgetId;
        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                    //console.log(website);
                    res.sendStatus(200);
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
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


        function findAllWidgetsForPage(req, res) {

            var pageId = req.params.pageId;

            model.pageModel.findAllWidgetsForPage(pageId)
                .then(function (resObj) {
                    // console.log("Total Widgets for page: "+resObj.widgets.length);
                    res.json(resObj.widgets);
                })
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var text         = req.body.text;
        var myFile        = req.file;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        var widget ={};
        widget["url"] = "/assignment/uploads/" + filename;
        widget["width"] = width;
        widget["text"] = text;
        var pageId        = req.body.pageId;
        WidgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                    //console.log(website);
                    res.redirect("/assignment/#/user/" + userId + "/website/"+ websiteId + "/page/" + pageId + "/widget/" + widgetId);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

    }
    //     }
    // }
};