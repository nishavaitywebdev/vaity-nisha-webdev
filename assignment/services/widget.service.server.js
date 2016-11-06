/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        res.send(myFile);

    }


    var widgets = [//user jannunzi
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 1, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},

        //user alice
        { "_id": "1231", "widgetType": "HEADER", "pageId": "3221", "size": 1, "text": "GIZMODO"},
        { "_id": "2341", "widgetType": "HEADER", "pageId": "3221", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        { "_id": "3451", "widgetType": "IMAGE", "pageId": "3221", "width": "100%",
            "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        { "_id": "4561", "widgetType": "HTML", "pageId": "3221", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
        { "_id": "5671", "widgetType": "HEADER", "pageId": "3221", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        { "_id": "6781", "widgetType": "YOUTUBE", "pageId": "3221", "width": "100%",
            "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        { "_id": "7891", "widgetType": "HTML", "pageId": "3221", "text": "<p>Lorem ipsum</p>"},

        //user
        { "_id": "1232", "widgetType": "HEADER", "pageId": "4312", "size": 1, "text": "GIZMODO"},
        { "_id": "2342", "widgetType": "HEADER", "pageId": "4312", "size": 3, "text": "Us Senate Reaches Compromise on Emergency Zika Funding"},
        { "_id": "3452", "widgetType": "IMAGE", "pageId": "4312", "width": "100%",
            "url": "http://www.thoughtmechanics.com/wp-content/uploads/2015/10/websitedesign.jpg"},
        { "_id": "4562", "widgetType": "HTML", "pageId": "4312", "text": " <h4>Contrary to popular belief, Richard McClintock, a Latin <b>professor at Hampden-Sydney College in Virginia</b>,</a>looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature</h4>"},
        { "_id": "5672", "widgetType": "HEADER", "pageId": "4312", "size": 2, "text": "Man in a wingsuit flies straight Through a ring of fire"},
        { "_id": "6782", "widgetType": "YOUTUBE", "pageId": "4312", "width": "100%",
            "url": "https://www.youtube.com/embed/jJ2ht5DDgp4" },
        { "_id": "7892", "widgetType": "HTML", "pageId": "4312", "text": "<p>Lorem ipsum</p>"}


    ];


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req,res){
        var pageId = req.params.pageId;
        var widget = req.body;
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);

        widget._id = id;
        //website.developerId = userId;
        widgets.push(widget);
        res.send(pageId);
    }

    function findWidgetById(req, res){
        var widget;
        var widgetId = req.params.widgetId;
        for( var w in widgets){
            if(widgets[w]._id === widgetId){
                widget = widgets[w];
                break;
            }
        }
        res.send(widget);
    }

    function updateWidget(req, res){
        var widget = req.body;
        console.log(widget);
        var widgetId = req.params.widgetId;
        for( var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets[w] = widget;
                break;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        for( var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets.splice(w,1);
                break;
            }
        }
        res.send('0');
    }

    function findAllWidgetsForPage(req,res) {
        var pageId = req.params.pageId;
        var widgetsOfPage=[];
        for( var w in widgets){
            if(widgets[w].pageId === pageId.toString()){
                widgetsOfPage.push(widgets[w]);
            }
        };
        res.send(widgetsOfPage);
    }

}