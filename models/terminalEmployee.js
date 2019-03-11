var db = require('../dbconnection');

var terminalEmployee = {

    authenticate: function (credentials,callback) {
        console.log(credentials);
        return db.query("select count(1) from  terminalemployee where EmployeeID=? and Password=?",
        [   credentials.EmployeeID,
            credentials.Password                                                                                                                                                                                                                    
           ],
        callback);
    }   ,
    updateLastLoginDetails: function (credentials,callback) {
        console.log(credentials);
        return db.query("update  terminalemployee set LastLoginTime=? , LastLoginDate=? where EmployeeID=? ",
        [   credentials.LastLoginTime,
            credentials.LastLoginDate,
            credentials.EmployeeID
           ],
        callback);
    }   

};
module.exports = terminalEmployee;
