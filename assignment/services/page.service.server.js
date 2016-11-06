/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app) {

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
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);

        page._id = id;
        //website.developerId = websiteId;
        pages.push(page);
        res.send(websiteId);
    }

    function findPageById(req, res){
        var page;
        var pageId = req.params.pageId;
        for( var p in pages){
            if(pages[p]._id === pageId){
                page = pages[p];
                break;
            }
        }
        res.send(page);
    }

    function updatePage(req, res){
        var page = req.body;
        console.log(page);
        var pageId = req.params.pageId;
        for( var p in pages){
            if(pages[p]._id === pageId){
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.send(pages[p].websiteId);
            }
        }
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for( var p in pages){
            if(pages[p]._id === pageId){
                pages.splice(p,1);
                res.send(websiteId);
            }
        }
    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;
        console.log("Inside findAllPagesForWebsite")
        var pagesOfWebsite=[];
        for( var p in pages){
            if(pages[p].websiteId === websiteId.toString()){
                pagesOfWebsite.push(pages[p]);
            }
        };
        res.send(pagesOfWebsite);
    }

}