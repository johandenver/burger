var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res){
    burger.selectAll(function(data) {
        var hbsObject = {
          burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
      });
});

router.post("/api/burger", function(req, res){
    console.log("post", req.body);
    burger.insertOne(["burger_name", "devoured"],[req.body.burger_name, req.body.devoured], function(results){
        console.log(results);
        res.json(results);
    }) 
});

router.put("/api/burger/:id", function(req,res){
    var condition = "id = " + req.params.id;
    burger.updateOne(req.body, condition, function(result){
        if (result.changedRows === 0) {
            return res.status(404).json(false).end();
        } else {
            res.status(200).json(true).end();
        }
    });
});

module.exports = router;