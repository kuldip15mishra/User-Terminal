var db = require("../dbconnection");
var request = require("request");
var geofence = {
    getfareType: function(userData, callback) {
        return db.query("select FareType from card where CardNumber=?", [userData.CardNumber], (err, result) => {
            if(err) {callback(err)}
            else {
                return db.query("select * from routefare where FareType=? and From_route=? and To_route=?", [
                    result[0].FareType, userData.FromStop, userData.ToStop], (err, routefare) => {
                        if(err) {callback(err)}
                        else {
                            if(routefare.length == 0) {
                                callback(null, "No routefare found");
                            } else {
                                db.query("select * from busroutesd where BusRoute=? and Direction=?", [
                                    routefare[0].BusRoute, routefare[0].Direction
                                ], (err, busroutesd) => {
                                    if(err) {callback(err)}
                                    else {
                                        if(busroutesd.length == 0) {
                                            callback(null, "No busroutesd found");
                                        } else { 
                                           return db.query("select * from busroute where BusRoute=?", [routefare[0].BusRoute], (err, driver) => {
                                                if(err) {callback(err)}
                                                else {
                                                    if(driver.length == 0) {
                                                        callback(null, "No busroute found");
                                                    } else { 
                                                        return db.query("select * from busstops where BusRoute=? and Direction=?", [
                                                            busroutesd[0].BusRoute, busroutesd[0].Direction
                                                        ], (err, busstops) => {
                                                            if(err) {callback(err)}
                                                            else {
                                                                var FromStopLat= "";
                                                                var FromStopLong = "";
                                                                var ToStopLat = "";
                                                                var ToStopLong = "";
                                                                var noOfStops = 0;
                                                                var interLat = {};
                                                                var interLong = {};
                                                                var interBustoUserLat = {};
                                                                var interBustoUserLong = {};
                            
                                                                var stops = []; //actual stops in bus route
                                                                busstops.forEach(element => {
                                                                    if(userData.FromStop == element.Stops) {
                                                                        FromStopLat = element.Lat;
                                                                        FromStopLong = element.Longtitude;
                                                                    }
                                                                    if(userData.ToStop == element.Stops) {
                                                                        ToStopLat = element.Lat;
                                                                        ToStopLong = element.Longtitude;
                                                                    } 
                                                                    if((element.Stops >= userData.FromStop) && (element.Stops <= userData.ToStop)) {
                                                                        noOfStops++;
                                                                        interLat['IntSopLat'+noOfStops] = element.Lat;
                                                                        interLong['IntStopLong'+noOfStops] = element.Longtitude;
                                                                    }
                                                                    // if((element.Lat == driver[0].CutLat) && (element.Longtitude == driver[0].CurLong)) {
                                                                    //     driverCurrentBusStop = element.Stops;
                                                                    // }
                                                                    stops.push(element.Stops);
                                                                });
                                                                var noOfStopsBtoU = 1;
                                                                for (let j= 0; j< busstops.length; j++) {
                                                                    if(busstops[j].Stops == userData.FromStop) {
                                                                        break;
                                                                    }
                                                                    interBustoUserLat['IntSopLat'+noOfStopsBtoU] = busstops[j].Lat;
                                                                    interBustoUserLong['IntStopLong'+noOfStopsBtoU] = busstops[j].Longtitude;
                                                                    noOfStopsBtoU++;
                                                                }
                                                                request(`https://maps.googleapis.com/maps/api/directions/json?origin=${userData.UserLat},${userData.UserLong}&destination=${FromStopLat},${FromStopLong}&key=AIzaSyCL3HiVql8h6uPOmeUNAr99egj6ZAF3htY`, (err, reponse, body) => {
                                                                    var responseFormate = {
                                                                        UserLat: userData.UserLat,
                                                                        UserLong: userData.UserLong,
                                                                        FromStopLat,
                                                                        FromStopLong,
                                                                        ToStopLat,
                                                                        ToStopLong,
                                                                        interLat,
                                                                        interLong,
                                                                        FromStop: userData.FromStop,
                                                                        ToStop: userData.ToStop,
                                                                        DriverLat: driver[0].CutLat,
                                                                        DriverLong: driver[0].CurLong,
                                                                        interBustoUserLat,
                                                                        interBustoUserLong,
                                                                        BusRoute: routefare[0].BusRoute,
                                                                        Bus_ID: driver[0].Bus_ID,
                                                                        UserETA: "",
                                                                        BusETA: "",
                                                                        Fare: routefare[0].Fare,
                                                                        Source: busroutesd[0].Source,
                                                                        Destination: busroutesd[0].Destination,
                                                                        stops,
                                                            
                                                                    }

                                                                    if(err) {console.log(err)}
                                                                    else {
                                                                        body = JSON.parse(body);
                                                                        console.log(body);
                                                                        if (body.routes.length) {
                                                                            var distance = body.routes[0].legs[0].distance.value;
                                                                            if(distance<=10) {
                                                                                responseFormate.UserETA = "Arrived";
                                                                            } else {
                                                                                responseFormate.UserETA = "Not Arrived";
                                                                            }
                                                                            request(`https://maps.googleapis.com/maps/api/directions/json?origin=${driver[0].CutLat},${driver[0].CurLong}&destination=${FromStopLat},${FromStopLong}&key=AIzaSyCL3HiVql8h6uPOmeUNAr99egj6ZAF3htY`, (err, res, body)=> {
                                                                                if(err) {console.log(err)}
                                                                                else {
                                                                                    body = JSON.parse(body);
                                                                                    if (body.routes.length) {
                                                                                        var Driverdistance = body.routes[0].legs[0].distance.value;
                                                                                        if(Driverdistance<=10) {
                                                                                            responseFormate.BusETA = "Arrived";
                                                                                        } else {
                                                                                            responseFormate.BusETA = "Not Arrived";
                                                                                        }
                                                                                        callback(null, responseFormate);
                                                                                    }
                                                                                }
                                                                            })
                                                                        }
                                                                        callback(null, responseFormate);
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                }
                                           })
                                        }
                                    }
                                })
                            }
                           
                        }
                    });
            }
        });
    }
};
module.exports = geofence;


