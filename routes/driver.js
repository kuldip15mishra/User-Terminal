var express = require('express');
var router = express.Router();
var driver = require('../models/driver');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        driver.getTaskById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        driver.getAllTasks(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

// router.put('/:id', function (req, res, next) {

//     driver.updateReportChangeDevice(req.params.id, req.body, function (err, rows) {

//         if (err) {
//             res.json(err);
//         }
//         else {
//             res.json(rows);
//         }
//     });
// });

router.put('/block/:id', function (req, res, next) {

    driver.updateDeactive(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

var busRoute = require('../models/BusRoute');


router.put('/updateLocation',function(req,res,next){
    console.log('here');
    busRoute.updateBusLocation(req,function(err,rows){
        if(err)
         {res.json(err)}
        else{res.json(rows)};
    });
});

router.get('/signin/:dID/:Password', function (req, res, next) {
    driver.signinDriver(req.params.dID, req.params.Password, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    });
});

router.post('/createcode', function (req, res, next) {
    driver.createCodebyMobile(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});

router.post('/verifycode', function (req, res, next) {
    driver.verifyCodebyMobile(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    });
});
//Driver signup
router.post('/signup', function (req, res, next) {
    driver.signupDriver(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            res.json(rows);
        }
    });
});


module.exports = router;