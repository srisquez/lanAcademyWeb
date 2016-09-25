
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var lessons = require('../models/lesson');

var Verify    = require('./verify');


var lessonRouter = express.Router();
lessonRouter.use(bodyParser.json());




lessonRouter.route('/')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    lessons.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, lesson) {
        if (err) next(err);
        res.json(lesson);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    lessons.findByIdAndUpdate(req.body._id, {
        $set: req.body
    }, {
        new: true
    }, function (err, lesson) {
        if (err) throw err;
        res.json(lesson);
    });
})




.post(Verify.verifyOrdinaryUser, function (req, res, next) {


    lessons.findOne({ 'date': req.body.date }, function (err, lessonData) {
    if (err) throw err;
    

    if (lessonData != null) {
        console.log('Duplicated!');
        res.status(200).json({message: 'duplicate key'});

    }else
    {

    lessons.create(req.body, function (err, lesson) {
        if (err) throw err;
        console.log('lesson created!');
        var id = lesson._id;
        //res.writeHead(200, {
          //  'Content-Type': 'text/plain'
        //});

     var msg = 'Added the lesson with id: ' + id;
     res.status(200).json({message: msg});

        
    });

      }});
})

.delete(Verify.verifyTeacher, function (req, res, next) {
    lessons.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

lessonRouter.route('/:lessonId')
.get( Verify.verifyOrdinaryUser, function (req, res, next) {
    lessons.findById(req.params.lessonId)
        .populate('comments.postedBy')
        .exec(function (err, lesson) {
        if (err) next(err);
        res.json(lesson);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        lessons.findByIdAndRemove(req.params.lessonId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

lessonRouter.route('/getLessonsByUser/:userId')
.get( Verify.verifyOrdinaryUser, function (req, res, next) {
    lessons.find({'RequestedBy': req.params.userId})
        .populate('teacher')
        .exec(function (err, lesson) {
        if (err) next(err);
        res.json(lesson);
    });
})

lessonRouter.route('/getLessonsByTeacher/:userId')
.get( Verify.verifyOrdinaryUser, function (req, res, next) {
    lessons.find({'teacher': req.params.userId})
        .populate('RequestedBy')
        .exec(function (err, lesson) {
        if (err) next(err);
        res.json(lesson);
    });
})


.put(Verify.verifyTeacher, function (req, res, next) {
    lessons.findByIdAndUpdate(req.params.lessonId, {
        $set: req.body
    }, {
        new: true
    }, function (err, lesson) {
        if (err) throw err;
        res.json(lesson);
    });
})

.delete(Verify.verifyTeacher, Verify.verifyTeacher, function (req, res, next) {
        lessons.findByIdAndRemove(req.params.lessonId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

lessonRouter.route('/:lessonId/comments')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    lessons.findById(req.params.lessonId)
        .populate('comments.postedBy')
        .exec(function (err, lesson) {
        if (err) next(err);
        res.json(lesson.comments);
    });
})

.post(Verify.verifyTeacher, function (req, res, next) {
    lessons.findById(req.params.lessonId, function (err, lesson) {
        if (err) next(err);
        req.body.postedBy = req.decoded._id;
        lesson.comments.push(req.body);
        lesson.save(function (err, lesson) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(lesson);
        });
    });
})

.delete(Verify.verifyTeacher, function (req, res, next) {
    lessons.findById(req.params.lessonId, function (err, lesson) {
        if (err) throw err;
        for (var i = (lesson.comments.length - 1); i >= 0; i--) {
            lesson.comments.id(lesson.comments[i]._id).remove();
        }
        lesson.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

lessonRouter.route('/:lessonId/comments/:commentId')
.get(Verify.verifyOrdinaryUser,function (req, res, next) {
    lessons.findById(req.params.lessonId)
        .populate('comments.postedBy')
        .exec(function (err, lesson) {
        if (err) throw err;
        res.json(lesson.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyTeacher,function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    lessons.findById(req.params.lessonId, function (err, lesson) {
        if (err) throw err;
        lesson.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._id;
        lesson.comments.push(req.body);
        lesson.save(function (err, lesson) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(lesson);
        });
    });
})

.delete(Verify.verifyTeacher,function (req, res, next) {
    lessons.findById(req.params.lessonId, function (err, lesson) {
        if (lesson.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        lesson.comments.id(req.params.commentId).remove();
        lesson.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});
module.exports = lessonRouter;
