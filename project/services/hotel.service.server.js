/**
 * Created by nishavaity on 12/6/16.
 */

module.exports = function(app,model){
    app.get('/api/city/:cityId/hotel',findHotelByCityId);

    function findHotelByCityId(req,res) {
        //console.log("Inside ind user by id")
        var cityId = req.params.cityId;
        model.hotelModel
            .findHotelByCityId(cityId)
            .then(
                function (user) {
                    console.log(user);
                    if(user)
                        res.send(user);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

}