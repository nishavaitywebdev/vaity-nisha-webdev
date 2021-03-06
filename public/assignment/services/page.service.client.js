/**
 * Created by nishavaity on 10/13/16.
 */
(function () {
    angular
        .module ("WebAppMaker")
        .factory("PageService", PageService)
    function PageService($http) {

        // var pages = [
        //     { "_id": "321", "name": "Post 1", "websiteId": "456" ,"description": "Lorem"},
        //     { "_id": "432", "name": "Post 2", "websiteId": "456","description": "Lorem" },
        //     { "_id": "543", "name": "Post 3", "websiteId": "456","description": "Lorem" },
        //     { "_id": "323", "name": "Post 1", "websiteId": "234","description": "Lorem"},
        //     { "_id": "4322", "name": "Post 2", "websiteId": "678","description": "Lorem"},
        //     { "_id": "5431", "name": "Post 3", "websiteId": "234","description": "Lorem"},
        //     { "_id": "3221", "name": "Post 1", "websiteId": "567","description": "Lorem" },
        //     { "_id": "4312", "name": "Post 2", "websiteId": "789","description": "Lorem"},
        //     { "_id": "5453", "name": "Post 3", "websiteId": "567","description": "Lorem" }
        //
        // ];

        var api = {
            createPage   : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;
        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            //page._id = id.toString();

            //pages.push(page);
            var url = '/api/website/'+websiteId+'/page';
            return $http.post(url,page);
        }
        function findPageByWebsiteId(websiteId) {

            var url = "/api/website/"+websiteId+"/page";
            //console.log(url);
            return $http.get(url);
            // var pagesOfWebsite=[];
            // //console.log(websiteId)
            // for( var p in pages){
            //     if(pages[p].websiteId === websiteId.toString()){
            //         pagesOfWebsite.push(pages[p]);
            //     }
            // }
            // return pagesOfWebsite;

        }
        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
            // for( var p in pages) {
            //     if (pages[p]._id === pageId.toString()) {
            //         //console.log("got it")
            //         return pages[p];
            //     }
            // }
        }
        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            return $http.put(url,page);
            // for( var p in pages){
            //     if(pages[p]._id === pageId){
            //         pages[p] = page;
            //         break;
            //     }
            // }
        }
        function deletePage(pageId) {
            var url = "/api/page/"+pageId;
            return $http.delete(url);
            // for( var p in pages){
            //     if(pages[p]._id === pageId.toString()){
            //         pages.splice(pages.indexOf(p), 1);
            //         break;
            //     }
            // }
        }
    }
})();