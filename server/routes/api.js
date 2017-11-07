const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

mongoose.connect("mongodb://localhost:27017/videos")

router.get('/videos', function(req,res){
    console.log("get all videos");
    Video.find({})
    .exec(function(err, videos){
        if(err){
            console.log("Error retrieving videos");
        } else {
            res.json(videos);
        }
    })
});

router.get('/videos/:id', function(req,res){
    console.log("get a single video");
    Video.findById(req.params.id)
    .exec(function(err, video){
        if(err){
            console.log("Error retrieving video");
        } else {
            res.json(video);
        }
    })
});

router.post('/video',function(req,res){
    console.log("Post a video");
    var newvideo = new Video();
    newvideo.title = req.body.title,
    newvideo._url = req.body._url,
    newvideo.description = req.body.description,
    newvideo.save(function(err, insertedvideo){
        if(err){
            console.log("Error uploading video");
        } else {
            res.json(insertedvideo);
        }
    });
});

router.put('/video/:id', function(req,res){
    console.log("Update a video");
    Video.findByIdAndUpdate(req.params.id,
    {
        $set: {description: req.body.description, _url: req.body._url, title: req.body.title}
    },
    {
        new: true
    },
    function(err, updatedVideo){
        if(err){
            res.send("Error updating video");
        } else {
            res.json(updatedVideo);
        }
    }
);
});


// router.put('/video/:id',function(res,req){
//     Video.findOne({id : req.params.id}, function(err,updatedVideo){
//         if(err){
//             res.send(err);
//         }
//         res.json(updatedVideo);
        
//         updatedVideo.title = req.body.title;
//         updatedVideo._url = req.body._url;
//         updatedVideo.description = req.body.description;

//         updatedVideo.save((err,response) => {
//             if(err){
//                 res.json(err);
//             }
//             res.json(response);
//         })

//     });
// });

router.delete('/video/:id', function(req, res){
    console.log("Deleting a video");
    Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
        if(err){
            res.send("Error deleting video");
        } else{
            res.json(deletedVideo);
        }
    });
});

module.exports = router;