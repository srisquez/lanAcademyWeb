
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var leaderships = require('../models/leadership');

var Verify    = require('./verify');


var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    leaderships.find({}, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})



.post(Verify.verifyTeacher, function (req, res, next) {
    leaderships.create(req.body, function (err, leadership) {
        if (err) throw err;
        console.log('Leadership created!');
        var id = leadership._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leadership with id: ' + id);
    });
})


.delete(Verify.verifyTeacher, function (req, res, next) {
    leaderships.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});



leaderRouter.route('/:leaderId')
.get(function (req, res, next) {
    leaderships.findById(req.params.leaderId, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})



.put(function (req, res, next) {
     leaderships.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})



.delete(function (req, res, next) {
    leaderships.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;
