
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var promotions = require('../models/promotions');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

var Verify    = require('./verify');


promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    promotions.find({}, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})



.post(Verify.verifyTeacher, function (req, res, next) {
    promotions.create(req.body, function (err,  promotion) {
        if (err) throw err;
        console.log('promotion created!');
        var id =  promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the  promotion with id: ' + id);
    });
})



.delete(Verify.verifyTeacher, function (req, res, next) {
    promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});




promoRouter.route('/:promoId')
.get(function (req, res, next) {
    promotions.findById(req.params.promoId, function (err, promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})



.put(function (req, res, next) {
     promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err,promotion) {
        if (err) throw err;
        res.json(promotion);
    });
})


.delete(function (req, res, next) {
    promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = promoRouter;


