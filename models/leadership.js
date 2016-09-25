var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
 

 // create a promotion schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
         required: true
    },
   designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
     featured: {
        type: Boolean,
        default:false
    },
    description: {
        type: String,
        required: true
    }  
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var leadership = mongoose.model('leadership', leadershipSchema);

// make this available to our Node applications
module.exports = leadership;