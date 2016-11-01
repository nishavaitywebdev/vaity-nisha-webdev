/**
 * Created by nishavaity on 11/1/16.
 */
(function () {
    angular
        .module("wamDirectives",[])
        .directive("wamSortable",wamSortable)
    
    
    function wamSortable() {
        console.log("Hi from wam sortable");
    }
})();