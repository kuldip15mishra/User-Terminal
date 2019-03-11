var express = require("express");
var router = express.Router();
var Buses = require("../models/busbus");
var driver = require('../models/driver');

router.get("/:id", function(req, res, next) {
  if (req.params.id) {
    Buses.getBusById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Buses.getAllBuses(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.put("/:id", function(req, res, next) {
  Buses.updateBus(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function(req, res, next) {
  Buses.addBus(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.delete("/:id", function(req, res, next) {
  Buses.deleteBus(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.post("/signup", function(req, res, next) {
  Buses.signupBus(req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      driver.getTaskById(req.body.Bus_ID, function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows[0]);
        }
      });
    }
  });
});
router.get("/signin/:Bus_ID/:Password", function(req, res) {
  Buses.signinBus(req.params.Bus_ID, req.params.Password, (err, rows) => {
    if (err) {
      res.json(err);
    } else {
      delete rows[0].Password;
      res.json(rows[0]);
    }
  });
});

// Bus edit profile
router.put("/update/:Bus_ID", function(req, res, next) {
  Buses.editBus(req.params.Bus_ID, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      driver.getTaskById(req.params.Bus_ID, function(err, rows) {
        if (err) {
          res.json(err);
        } else {
          res.json(rows[0]);
        }
      });
    }
  });
});

module.exports = router;
