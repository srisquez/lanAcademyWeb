var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    Favorites.findOne({ 'postedBy': req.decoded._doc._id })
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorites) {
        //favorites
	    if (err) throw err;
	    res.json(favorites);
	});
})

.post(function (req, res, next) {
    Favorites.findOne({ 'postedBy': req.decoded._doc._id }, function (err, favorites) {
    if (err) throw err;
	
    if (favorites) {
	    if (favorites.dishes.indexOf(req.body._id) == -1) {

            favorites.dishes.push(req.body._id);
            favorites.save(function (err, favorites) {
                if (err) throw err;
                console.log('The dish is added to favorites');
            });
	    }
	    res.json(favorites);
        
	} else {
	    var newDocFavorites = {
            'postedBy': req.decoded._doc._id,
            'dishes': [ req.body._id ]
	    };
	    Favorites.create(newDocFavorites, function (err, created) {
            if (err2) throw err2;
            console.log('The new favorites has been created');
            res.json(created);
	    })
	}
    });
})

.delete(function (req, res, next) {
    Favorites.findOneAndRemove({ 'postedBy': req.decoded._doc._id }, function (err, resp) {
        if (err) throw err;

        res.json(resp);
    });
});


favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({ 'postedBy': req.decoded._doc._id }, function (err, favorites) {
        if (err) throw err;
        if (favorites) {
            favorites.dishes.remove(req.params.dishId);

            favorites.save(function (err, resp) {
                if (err) throw err;
                console.log('Remove the favorite from Dish');
                res.json(resp);
            });
        } else {
            res.json(favorites);
	   }
    });
});


module.exports = favoriteRouter;
