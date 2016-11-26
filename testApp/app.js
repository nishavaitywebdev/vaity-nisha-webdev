/**
 * Created by nishavaity on 11/12/16.
 */
var express = require('express')
var app = express()
var request = require('request');
app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3010, function () {
    console.log('Example app listening on port 3010!')
})

// var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for the Google homepage.
//     }
// })

var url = 'https://candidate.hubteam.com/candidateTest/v1/partners?userKey=cfe732ea64bcde480bfda97e7747';
var responseBody;

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        responseBody = body // Data

        var peopleByCountry = {};
        //var partners   = [];
        var strToJSon = JSON.parse(body);
        var partners = strToJSon.partners;
        //console.log(partners);
        for (var p in partners){
            var reqPartner = {};
            var country = partners[p]["country"];
            var availableDates = [];
            if(peopleByCountry.hasOwnProperty(country)){
                reqPartner.email = partners[p].email;
                availableDates = partners[p].availableDates;
                reqPartner.availableDates = availableDates; //partners[p].availableDates;
                peopleByCountry[country].push(reqPartner);
            }
            else{

                reqPartner.email = partners[p].email;
                availableDates = partners[p].availableDates;
                //console.log(availableDates);
                reqPartner.availableDates = availableDates;
                peopleByCountry[country]  = [];
                peopleByCountry[country].push(reqPartner);

            }
        }


        //var peopleCount = 0;
        for (var c in peopleByCountry){
            if(peopleByCountry.hasOwnProperty(c)){
                var people = peopleByCountry[c];
                var  arrayPeople = [[],[]];
                for (var i in people.length){
                    for (var j in people.length){
                        arrayPeople[i][j] = 0;
                    }

                }

                // for (var i in people){
                //     for (var j in people){
                //         //people[i].availableDates
                //         //
                //         // for (var d in people[j].availableDates){
                //         //     for
                //         //     if()
                //         // }
                //         // console.log(common);
                //         //arrayPeople[i][j] = 0;
                //     }
                //
                // }

            }

        }
        //console.log(peopleByCountry);
    }


    // POST

    var posturl = 'https://candidate.hubteam.com/candidateTest/v1/results?userKey=cfe732ea64bcde480bfda97e7747';
    request.post(posturl, {form:{countries:peopleByCountry}} , function (error, response, body){
        console.log(response.statusCode);
    });

})



//
// var dataRequest = request.get({url:url, oauth:oauth, qs:qs, json:true}, function (e, r, user) {
//     console.log(user)
// })
//
// dataRequest();