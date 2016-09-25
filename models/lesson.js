var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var lessonSchema = new Schema({
    date: {
        type: Date,
        required: true    
    },
    startHour: {
        type: String,
         required: true
       },
    lessonType: {
        type: String,
         required: true
    },
    RequestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } ,
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var lesson = mongoose.model('lesson', lessonSchema);

// make this available to our Node applications
module.exports = lesson;