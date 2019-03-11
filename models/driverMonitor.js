var db = require("../dbconnection");
var md5 = require("md5");
var monitor = {
  getDriverMonitor: function(dID, BusID, callback) {
    return db.query(
      "select * from drivermonitor where dID=? and BusID=?",
      [dID, BusID],
      callback
    );
  },
  createDriverMonitor: function(drivermonitor, callback) {
    return db.query(
      "insert into drivermonitor (dID, BusID, BusRoute, Direction, Heartbeat, Experience, acceleration, velocity, speed, displacement, fuel, lat, longi, date, time, TrafficDensityvehiclesperhour, rating) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        drivermonitor.dID,
        drivermonitor.BusID,
        drivermonitor.BusRoute,
        drivermonitor.Direction,
        drivermonitor.Heartbeat,
        drivermonitor.Experience,
        drivermonitor.acceleration,
        drivermonitor.velocity,
        drivermonitor.speed,
        drivermonitor.displacement,
        drivermonitor.fuel,
        drivermonitor.lat,
        drivermonitor.longi,
        drivermonitor.date,
        drivermonitor.time,
        drivermonitor.TrafficDensityvehiclesperhour,
        drivermonitor.rating
      ],
      callback
    );
  },
  updateDriverMonitor: function(id, drivermonitor, callback) {
    return db.query(
      "update drivermonitor set dID=?,BusID=?,BusRoute=?,Direction=?,Heartbeat=?,Health=?,Experience=?,acceleration=?,velocity=?,speed=?,displacement=?,fuel=?,lat=?,longi=?,date=?,time=?,TrafficDensityvehiclesperhour=?,rating=? where dID=?",
      [
        drivermonitor.dID,
        drivermonitor.BusID,
        drivermonitor.BusRoute,
        drivermonitor.Direction,
        drivermonitor.Heartbeat,
        drivermonitor.Health,
        drivermonitor.Experience,
        drivermonitor.acceleration,
        drivermonitor.velocity,
        drivermonitor.speed,
        drivermonitor.displacement,
        drivermonitor.fuel,
        drivermonitor.lat,
        drivermonitor.longi,
        drivermonitor.date,
        drivermonitor.time,
        drivermonitor.TrafficDensityvehiclesperhour,
        drivermonitor.rating,
        id
      ],
      (err, result) => {
          if (err) {callback(err);}
          else {
            return db.query("select * from drivermonitor where dID=?", [id], (err, drivermonitors)=> {
                if(err) {callback(err)}
                else {
                callback(null, drivermonitors);
                }
            })
          }
      }
    );
  }
};

module.exports = monitor;
