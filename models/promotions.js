var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
 

 // create a promotion schema
var promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
         required: true
    },
    label: {
        type: String,
         required: true,
        default: ''
    },
     featured: {
        type: Boolean,
        default:false
    },
    price: {
        type: Currency,
         required: true
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
var promotions = mongoose.model('Promotion', promotionSchema);

// make this available to our Node applications
module.exports = promotions;