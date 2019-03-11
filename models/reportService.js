var db = require('../dbconnection');

var reportService = {

    getAllReportServices: function (callback) {

        return db.query("Select * from reportservice", callback);
    },
    getReportServiceById: function (id, callback) {
        return db.query("select * from reportservice where ReportID=?", [id], callback);
    },
    addReportService: function (reportService, callback) {
        return db.query("Insert into reportservice values(NULL,?,?,?,?,?,?,?,?,?,?)", [
            reportService.UserID, reportService.ReportID, reportService.Report_Type,
            reportService.Issue, reportService.DeviceID, reportService.Device,
            reportService.Report_Date,reportService.Status,reportService.ServicedBY,
            reportService.BusID], (error, result) => {
                if (result ) {
                    return db.query(`select id from reportservice where UserID=? &&  ReportID=?`, [reportService.UserID,reportService.ReportID], callback)
                } else {
                    return callback(`No record found.`);
    
                }
            });
   
        },
    updateReportService: function (id, reportService, callback) {
        return db.query("update reportservice set UserID=?,Report_Type=?,Issue=?,DeviceID=?,Device=?,Report_Date=?,Status=?,ServicedBY=?,BusID=? where ReportID=?", [
            reportService.UserID, reportService.Report_Type,
            reportService.Issue, reportService.DeviceID, reportService.Device,
            reportService.Report_Date,reportService.Status,reportService.ServicedBY, reportService.BusID, reportService.ReportID], callback);
    },
    deleteReportService: function (id, reportService, callback) {
        return db.query("delete from reportservice where ReportID = ?", [id], callback);
    },
    getReportServiceByBusID: function (BusID, callback) {
        return db.query("select * from reportservice where BusID=?", [BusID], callback);
    },

};
module.exports = reportService;