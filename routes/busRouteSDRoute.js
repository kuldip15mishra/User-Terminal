var express = require('express');
var router = express.Router();
var busRouteSD = require('../models/busRouteSD');

    router.get('/getAll', function (req, res, next) {

        busRouteSD.getAllBusRoutesSD(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    
   

});


    router.put('/:id', function (req, res, next) {
        busRouteSD.updateBusRouteSD(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });

    router.post('/', function (req, res, next) {
        busRouteSD.addBusRouteSD(req.body, function (err, count) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(req.body);
            }
        });
    });

    router.delete('/:id', function (req, res, next) {
        busRouteSD.deleteBusRouteSD(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });

    router.get('/BusRoute/:BusRoute', function (req, res, next) {
        busRouteSD.getBusRouteSDByRoute(req.params.BusRoute, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });

module.exports = router;