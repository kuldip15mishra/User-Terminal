var db = require('../dbconnection');

var terminalEmployeeLog = {

    createLog: function (logdetails,callback) {
        console.log(logdetails);
        return db.query("Insert into terminalemployeelog values(NULL,?,?,?,?,?,?,?,?,?)",
        [   logdetails.TableName,
            logdetails.ColumnName,
            logdetails.TabelRowid,
            logdetails.CreateEmployeeID,
            logdetails.CreateDate,
            logdetails.CreateTime,
            logdetails.UpdateEmployeeID,
            logdetails.UpdateDate,
            logdetails.UpdateTime],
        callback);
    },
    getAllLog: function (params, callback) {
        return db.query("SELECT * FROM terminalemployeelog WHERE id = (SELECT MAX(id) from terminalemployeelog where TableName=? and TableRowid=?)",
        [   params.TableName,
            params.TableRowid                                                                                                                                                                                                                    
           ],  callback);
    }
   

};
module.exports = terminalEmployeeLog;
