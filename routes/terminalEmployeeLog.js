var express = require('express');
var {
    promisify
} = require('util');
var router = express.Router();
var terminalEmployeeLog = require('../models/terminalEmployeeLog');

//Add Service
router.post('/insertLog', function (req, res, next) {
    //console.log(req.body);
    terminalEmployeeLog.createLog(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
})
//Add Service
router.get('/getlog/:tablename/:rowid', function (req, res, next) {
   
    if (req.params.tablename && req.params.rowid) {
        var queryParams ={
            TableName :req.params.tablename,
            TableRowid :req.params.rowid
        }
        //console.log(queryParams);
        terminalEmployeeLog.getAllLog(queryParams, function (err, count) {
            if (err) {
                res.json(err);
            } else {
               // console.log(queryParams);
                res.json(count);
            }
        });
    }
})


module.exports = router;