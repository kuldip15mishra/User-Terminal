var db = require('../dbconnection');
var md5 = require('md5');   
var Buses = {
    getAllBuses: function (callback) {
        return db.query("Select * from bus", callback);
    },
    getBusById: function (id, callback) {
        return db.query("select * from bus where Bus_ID=?", [id], callback);
    },
    addBus: function (Buses, callback) {
        return db.query("Insert into bus values(NULL,?,?,?,?,?,?,?)", [
            Buses.Bus_ID, Buses.Owner, Buses.Driver, Buses.Card_Reader_ID1,
            Buses.Card_Reader_ID2, Buses.Controller_ID,Buses.AdPanelID], callback);
    },
    updateBus: function (id, Buses, callback) {
        return db.query("update bus set Bus_ID=?,FirstName=?,LastName=?,Card_Reader_ID1=?,Card_Reader_ID2=?,Controller_ID=?,AdPanelID=? where id=?", [
            Buses.Bus_ID, Buses.FirstName,Buses.LastName, Buses.Card_Reader_ID1, Buses.Card_Reader_ID2,
            Buses.Controller_ID,Buses.AdPanelID, Buses.id], callback);
    },
    deleteBus: function (id, Buses, callback) {
        return db.query("delete from bus where Bus_ID = ?",[id], callback);
    },
    signupBus: function (Driver, callback) {
        return db.query("select * from bus where Bus_ID=?", [Driver.Bus_ID], (err, result) => {
            if (err) {callback(err)}
            else {
                if(!result[0]) {
                    return db.query("insert into driver (Password,Bus_ID,isOTP,Mobile) values (?,?,?,?)", [
                            md5(Driver.Password), Driver.Bus_ID, Driver.isOTP, Driver.Mobile], (err, result) => {
                                if (err) {callback(err)}
                                else {
                                    return db.query("insert into bus (Bus_ID) values (?)", [Driver.Bus_ID], (err, res) => {
                                        if (err) {callback(err)}
                                        else {
                                            return db.query("insert into busroute (Bus_ID, BusRoute) values (?,?)", [Driver.Bus_ID, Driver.BusRoute], callback)
                                        }
                                    })
                                }
                            })
                } else {
                    callback("ID already exist");
                }
            }
        })
    },
    signinBus: function(Bus_ID, Password, callback) {
        return db.query("select * from driver where Bus_ID=? and Password=?", [Bus_ID, md5(Password)], (err, result) => {
            if (err) {callback(err)}
            else {
                if(result[0]) {
                    return db.query("select * from busroute where Bus_ID=?", [Bus_ID], (err, data) => {
                       result[0].BusRoute = data[0].BusRoute;
                        callback(null, result);
                    })
                } else {
                    callback("Invalid credentials");
                }
            }
        })
    },

    editBus: function(Bus_ID, Driver, callback) {
        return db.query("update driver set FirstName=?,LastName=?,Email=?,Mobile=?,City=?,State=?,Pincode=?,Age=?,Password=?,isOTP=? where Bus_ID=?", [
            Driver.FirstName, Driver.LastName, Driver.Email, Driver.Mobile, Driver.City, Driver.State, Driver.Pincode, Driver.Age, md5(Driver.Password), Driver.isOTP, Bus_ID], (err, result) => {
                if(result) {
                    if(result.affectedRows) {
                        return db.query("update bus set FirstName=?,LastName=? where Bus_ID=?", [Driver.FirstName, Driver.LastName, Bus_ID], (err, res) => {
                            if (err) {callback(err)}
                            else {
                              return db.query("update busroute set BusRoute=? where Bus_ID=?", [Driver.BusRoute, Driver.Bus_ID], callback)
                            }
                        });
                    } else {
                        return callback("No record found.");
                    }
                } else {
                    return callback(err);
                }
            })
    },
};
module.exports = Buses;
