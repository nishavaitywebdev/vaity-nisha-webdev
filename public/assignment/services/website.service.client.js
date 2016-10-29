/**
 * Created by nishavaity on 10/13/16.
 */
(function () {
    angular
        .module ("WebAppMaker")
        .factory("WebsiteService", WebsiteService)
    function WebsiteService($http) {

        // var websites = [
        //     { "_id": "123", "name": "Facebook",    "developerId": "456" },
        //     { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        //     { "_id": "456", "name": "Gizmodo",     "developerId": "345" },
        //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        //     { "_id": "678", "name": "Checkers",    "developerId": "123" },
        //     { "_id": "789", "name": "Chess",       "developerId": "234" }
        // ];

        var api = {
            createWebsite   : createWebsite,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite

        };
        return api;
        function createWebsite(userId, website) {

            var url = '/api/user/'+ userId +'/website';
            return $http.post(url,website);

           // websites.push(website);
        }
        function findWebsitesByUser(userId) {
            //console.log(userId)
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
        function findWebsiteById(websiteId) {


            var url = "/api/website"+websiteId;
            return $http.get(url);

            // var website;
            // for( var w in websites){
            //     if(websites[w]._id === websiteId){
            //         website = websites[w];
            //         return website;
            //         break;
            //     }
            // }
            // return website;

        }
        function updateWebsite(websiteId, websiteUpdated) {

            var url = "/api/website"+websiteId;
            return $http.put(url,websiteUpdated);

            // for (var w in websites){
            //     if(websites[w]._id === websiteId.toString()){
            //         websites[w] = websiteUpdated;
            //         break;
            //     }
            // }
        }
        function deleteWebsite(websiteId) {

            var url = "/api/website"+websiteId;
            return $http.delete(url);

            // for (var w in websites){
            //     if(websites[w]._id === websiteId.toString()){
            //         websites.splice(websites.indexOf(w), 1);
            //         break;
            //     }
            // }

        }
    }
})();