/**
 * Created by nishavaity on 10/26/16.
 */
module.exports = function(app){
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "345" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
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
        //console.log("in website by id")
        var website;
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id === websiteId){
                website = websites[w];
                res.send(website);
            }
        }
        //res.send('0');
    }

    function updateWebsite(req, res){
        var website = req.body;
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id == websiteId.toString()){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.send(websites[w].developerId);
            }
        }
        //res.send('0');
    }

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for( var w in websites){
            if(websites[w]._id === websiteId.toString()){
                console.log(websites[w]);
                var developerId = websites[w].developerId;
                websites.splice(w,1);
                res.send(developerId);
            }
        }
        //res.send('0');
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        //console.log(userId);
        var websitesOfUser=[];
        for( var w in websites){
            if(websites[w].developerId === userId.toString()){
                websitesOfUser.push(websites[w]);
            }
        };
        res.send(websitesOfUser);
    }

}