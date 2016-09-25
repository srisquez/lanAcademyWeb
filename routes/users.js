var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');


router.get('/getUser/:userId', Verify.verifyOrdinaryUser, function (req, res, next) {

 User.findById(req.params.userId).exec(function (err, user) {
        if (err) next(err);
        res.json(user);
    });
});


router.get('/getAllUser',Verify.verifyTeacher, function (req, res, next) {

  User.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});

router.get('/getStudentsUser',Verify.verifyTeacher, function (req, res, next) {

  User.find({'profile':'Student'}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});

router.get('/getTeachersUser',Verify.verifyOrdinaryUser, function (req, res, next) {

  User.find({'profile':'Teacher'}, function (err, user) {
        if (err) throw err;
        res.json(user);
    });
});


router.post('/setPassword/:userId', function(req, res) {

  var newPasswordString = req.body.newpassword;
User.findById(req.params.userId).then(function(sanitizedUser){
    if (sanitizedUser){
        sanitizedUser.setPassword(newPasswordString, function(){
            sanitizedUser.save();
            res.status(200).json({message: 'password reset successful'});
        });
    } else {
        res.status(500).json({message: 'This user does not exist'});
    }
},function(err){
    console.error(err);
});
});



router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
                if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
         if(req.body.studentId) {
            user.studentId = req.body.studentId;
        }
        else
        {
   User.find().sort({studentId:-1}).limit(1).exec(function (err, data) {
        console.error(data);
    });

         }



         if(req.body.contactTel) {
            user.contactTel = req.body.contactTel;
        }
        if(req.body.profile) {
            user.profile= req.body.profile;
        }

                user.save(function(err,user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful!'});
            });
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        
      var token = Verify.getToken({"username":user.username, "_id":user._id, "profile":user.profile});
      var profile = user.profile;
      var userId = user._id;

              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token,
        userId: userId,
        profile: profile
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/facebook', passport.authenticate('facebook'),
  function(req, res){});

router.get('/facebook/callback', function(req,res,next){
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
       var token = Verify.getToken({"username":user.username, "_id":user._id, "profile":user.profile});
          
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
});

router.route('/getFeedbacksTeacher/:userId/feedback')
.get(Verify.verifyTeacher,function (req, res, next) {
    User.find(  {'feedback.postedBy': req.params.userId} )
        .populate('feedback.postedBy')
        .exec(function (err, User) {

         var feedbacks  = new Array();


        for (var i = (User.length - 1); i >= 0; i--) {

          //for (var j = (User[i].feedback.length - 1); j >= 0; j--) {

            //  feedbacks.push(User[i].feedback[j]);
           //}

            feedbacks = User[i].feedback;

        }

        if (err) next(err);
        //res.json(feedbacks);
        res.json(User);
    });
})



router.route('/:userId/feedback')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.userId)
        .populate('feedback.postedBy')
        .exec(function (err, User) {
        if (err) next(err);
        res.json(User.feedback);
    });
})

.post(Verify.verifyTeacher, function (req, res, next) {
    User.findById(req.params.userId, function (err, user) {
        if (err) next(err);
        req.body.postedBy = req.decoded._id;
        user.feedback.push(req.body);
        user.save(function (err, user) {
            if (err) throw err;
            console.log('Updated feedback!');
            res.json(user);
        });
    });
})

.delete(Verify.verifyTeacher, function (req, res, next) {
    User.findById(req.params.userId, function (err, user) {
        if (err) throw err;
        for (var i = (user.feedback.length - 1); i >= 0; i--) {
            user.feedback.id(user.feedback[i]._id).remove();
        }
        user.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all feedback!');
        });
    });
});




router.route('/:userId/feedback/:feedbackId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    User.findById(req.params.userId)
        .populate('feedback.postedBy')
        .exec(function (err, user) {
        if (err) throw err;
        res.json(user.feedback.id(req.params.feedbackId));
    });
})

.put(Verify.verifyTeacher,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    User.findById(req.params.userId, function (err, user) {
        if (err) throw err;
        user.feedback.id(req.params.feedbackId).remove();
                req.body.postedBy = req.decoded._id;
        user.feedback.push(req.body);
        user.save(function (err, user) {
            if (err) throw err;
            console.log('Updated feedback!');
            res.json(user);
        });
    });
})

.delete(Verify.verifyTeacher,function (req, res, next) {
    User.findById(req.params.userId, function (err, user) {

      console.log(req.decoded._id);

        if (user.feedback.id(req.params.feedbackId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        user.feedback.id(req.params.feedbackId).remove();
        user.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});


module.exports = router;