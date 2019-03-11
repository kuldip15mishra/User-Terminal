var db = require('../dbconnection');

var busRouteSD = {

    getAllBusRoutesSD: function (callback) {

        return db.query("Select * from busroutesd", callback);
    },
    getBusRouteSDById: function (id, callback) {
        return db.query("select * from busroutesd where id=? ", [id], callback);
    },
    getBusRouteSDByRoute: function (id, callback) {
        return db.query("select * from busroutesd where BusRoute=? ", [id], callback);
    },
    addBusRouteSD: function (BusRoute, callback) {
        return db.query("Insert into busroutesd values(NULL,?,?,?,?)", [
            BusRoute.BusRoute, BusRoute.Source, 
            BusRoute.Destination,BusRoute.Direction], callback);
    },
    updateBusRouteSD: function (id, BusRoute, callback) {
        return db.query("update busroutesd set BusRoute=?,Source=? ,Destination=?, Direction=? where id=?", 
        [  BusRoute.BusRoute, BusRoute.Source, 
            BusRoute.Destination,BusRoute.Direction,id], callback);
    },
    deleteBusRouteSD: function (id,body, callback) {
        return db.query("delete from busroutesd where id = ?", [id], callback);
    },
    

};
module.exports = busRouteSD;
