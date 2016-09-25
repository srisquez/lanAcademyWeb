// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var favoriteSchema = new Schema({
     postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [ {dish : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
        }
       }
    ]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorites;



