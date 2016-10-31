/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function (app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "345" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.get("api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function createWebsite(req,res){
        var userId = req.params.userId;
        var website = req.body;
        var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        id = id.substring(-2);

        website._id = id;
        website.developerId = userId;
        websites.push(website);
        res.send(userId);
    }

    function findWebsiteById(req, res){
        var website;
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id === websiteId){
                website = websites[w];
                break;
            }
        }
        res.send(website);
    }

    function updateWebsite(req, res){
        var website = req.body;
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id === websiteId){
                websites[w] = website;
                break;
            }
        }
        res.send('0');
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id === websiteId){
                websites.splice(w,1);
                break;
            }
        }
        res.send('0');
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        var websitesOfUser=[];
        for( var w in websites){
            if(websites[w].developerId === userId.toString()){
                websitesOfUser.push(websites[w]);
            }
        };
        res.send(websitesOfUser);
    }

}