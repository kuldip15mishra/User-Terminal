var express = require('express');
var router = express.Router();
var driverMonitor = require('../models/driverMonitor');

router.get('/:dID/:Bus_ID', function (req, res, next) {
    driverMonitor.getDriverMonitor(req.params.dID, req.params.Bus_ID, (err, rows) => {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    })
})
router.post('/', function (req, res, next) {
    driverMonitor.createDriverMonitor(req.body, (err, rows) => {
        if (err) { res.json(err); }
        else { res.json(rows); }
    })
})
router.put('/:id', function (req, res, next) {
    driverMonitor.updateDriverMonitor(req.params.id, req.body, (err, rows) => {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    })
})
module.exports = router;