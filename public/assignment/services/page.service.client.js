/**
 * Created by nishavaity on 10/13/16.
 */
(function () {
    angular
        .module ("WebAppMaker")
        .factory("PageService", PageService)
    function PageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

        var api = {
            "createPage"   : "createPage",
            "findPageByWebsiteId" : "findPageByWebsiteId",
            "findPageById" : "findPageById",
            "updatePage" : "updatePage",
            "deletePage" : "deletePage"

        };
        return api;
        function createPage(websiteId, page) {  }
        function findPageByWebsiteId(websiteId) {

            var pagesOfWebsite=[];
            pages.forEach(function(page){
                if(page.websiteId == websiteId){
                    pagesOfWebsite.add(page);
                }
            });
            return pagesOfWebsite;

        }
        function findPageById(pageId) {
            pages.forEach(function(page){
                if(page._id == pageId){
                    return page;
                }
            });
        }
        function updatePage(pageId, page) {  }
        function deletePage(pageId) {  }
    }
})();