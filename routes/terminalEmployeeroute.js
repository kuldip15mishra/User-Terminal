var express = require('express');
var { promisify } = require('util');
var router = express.Router();
var terminalEmployee=require('../models/terminalEmployee');

//Add Service
router.post('/authenticate', function (req, res, next) {
    //console.log(req.body);
    terminalEmployee.authenticate(req.body, function (err, count) {
        if (err) { res.json(err);}
        else { res.json(count); }
    });
})
router.post('/updateLastLogin', function (req, res, next) {
    //console.log(req.body);
    terminalEmployee.updateLastLoginDetails(req.body, function (err, count) {
        if (err) { res.json(err);}
        else { res.json(count); }
    });
})
module.exports=router;