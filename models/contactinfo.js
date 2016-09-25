var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactInfoSchema = new Schema({
   
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    contactTel: {
      type: String,
        default: ''
    },
     email:   {
        type: String,
       required: true
    }, 
    subject:   {
        type: String,
        required: true
    }
    ,
     question:   {
        type: String,
        required: true
    }
    }, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var contactinfo = mongoose.model('contactinfo', contactInfoSchema);

// make this available to our Node applications
module.exports =  contactinfo;

