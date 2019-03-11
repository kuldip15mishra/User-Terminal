var express = require('express');
var router = express.Router();
var geofence = require('../models/geofence');

router.post('/', function(req, res, next) {
  geofence.getfareType(req.body, function (err, rows) {
      if (err) {res.json(err)}
      else {
          res.json(rows);
      }
  })
});

module.exports = router;
