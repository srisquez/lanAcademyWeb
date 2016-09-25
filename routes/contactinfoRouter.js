
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var contactinfos = require('../models/contactinfo');

var contactRouter = express.Router();

contactRouter.use(bodyParser.json());

var Verify    = require('./verify');


contactRouter.route('/')
.get(Verify.verifyTeacher, function (req, res, next) {
    contactinfos.find({}, function (err, contactinfo) {
        if (err) throw err;
        res.json(contactinfo);
    });
})



.post( function (req, res, next) {
    contactinfos.create(req.body, function (err,  contactinfo) {
        if (err) throw err;
        console.log('contactinfo created!');
        var id =  contactinfo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the  contactinfo with id: ' + id);
    });
})



.delete(Verify.verifyTeacher, function (req, res, next) {
    contactinfos.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});




contactRouter.route('/:contactId')
.get(function (req, res, next) {
    contactinfos.findById(req.params.contactId, function (err, contactinfo) {
        if (err) throw err;
        res.json(contactinfo);
    });
})



.put(Verify.verifyTeacher,function (req, res, next) {
     contactinfos.findByIdAndUpdate(req.params.contactId, {
        $set: req.body
    }, {
        new: true
    }, function (err,contactinfo) {
        if (err) throw err;
        res.json(contactinfo);
    });
})


.delete(Verify.verifyTeacher,function (req, res, next) {
    contactinfos.findByIdAndRemove(req.params.contactId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = contactRouter;


