/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app, model) {

    var PageModel = model.pageModel;
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" ,"description": "Lorem"},
        { "_id": "432", "name": "Post 2", "websiteId": "456","description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456","description": "Lorem" },
        { "_id": "323", "name": "Post 1", "websiteId": "234","description": "Lorem"},
        { "_id": "4322", "name": "Post 2", "websiteId": "678","description": "Lorem"},
        { "_id": "5431", "name": "Post 3", "websiteId": "234","description": "Lorem"},
        { "_id": "3221", "name": "Post 1", "websiteId": "567","description": "Lorem" },
        { "_id": "4312", "name": "Post 2", "websiteId": "789","description": "Lorem"},
        { "_id": "5453", "name": "Post 3", "websiteId": "567","description": "Lorem" }

    ];

    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req,res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        PageModel
            .createPage(websiteId, page)
            .then(function (page) {
                    console.log(page);
                    res.send(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findPageById(req, res){
        var page;
        var pageId = req.params.pageId;
        PageModel
            .findPageById(pageId)
            .then(function (page) {
                    console.log(page);
                    res.send(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updatePage(req, res){
        var page = req.body;
        console.log(page);
        var pageId = req.params.pageId;
        PageModel
            .updatePage(pageId,page)
            .then(function (data) {
                    //console.log(page);
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        var websiteId;
        PageModel
            .deletePage(pageId)
            .then(function (pageId) {
                    //console.log(page);
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        //console.log("Inside findAllPagesForWebsite")
        var pagesOfWebsite=[];
        PageModel
            .findPagesForWebsite(websiteId)
            .then(function (pages) {
                    //console.log(page);
                    res.send(pages);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

}