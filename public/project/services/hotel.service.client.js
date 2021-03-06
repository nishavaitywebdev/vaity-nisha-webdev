/**
 * Created by nishavaity on 12/6/16.
 */
(function () {
    angular
        .module("MakeYourTourApp")
        .factory("HotelService", HotelService)
    function HotelService($http) {
        var api = {

            findHotelByCityId: findHotelByCityId,
            findHotelById: findHotelById

        };
        return api;


    function findHotelByCityId(cityId) {
        var url = "http://developer.goibibo.com/api/voyager/get_hotels_by_cityid/?app_id=14654cdf&app_key=1e64496250cc0415a50feda5b07a1c45&city_id="+cityId;
        //console.log(url);
        return $http.get(url);
    }

    function findHotelById(hotelId) {
        var url = "http://developer.goibibo.com/api/voyager/?app_id=14654cdf&app_key=1e64496250cc0415a50feda5b07a1c45&method=hotels.get_hotels_data&id_list=%5B"+hotelId+"%5D&id_type=_id";
        //console.log(url);
        return $http.get(url);
    }
    }
})();