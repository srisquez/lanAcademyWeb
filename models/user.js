var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var feedbackSchema = new Schema({
    feedbackDes:  {
        type: String,
        required: true
    },
    postedDate:  {
        type: Date
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var User = new Schema({
      username: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    studentId: {
      type: String,
        default: ''
    },
    contactTel: {
      type: String,
        default: ''
    },
    profile:   {
        type: String,
        default: 'Student'
    },
     feedback :[feedbackSchema]
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);