const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const User = require('../models/user');
const Event = require('../models/event');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImage = multer({ dest: 'uploads/' })

router.post('/user/:id', uploadImage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    User.findByIdAndUpdate(req.params.id,
      { $set: { profileImage: result.url }},
      { new: true },
      (err, user) => {
        if(err){
          return res.json(500)
        }
        return res.json(user)
      })
  })
})

router.post('/events', uploadImage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    return res.json(result.url);
  });
});

router.post('/events/:id', uploadImage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { imageUrl: result.url }},
      { new: true },
      (err, event) => {
        if(err){
          return res.json(500)
        }
        return res.json(event)
      })
  })
})

router.put('/user/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: {profileImage: req.body.profileImage}},
    { new: true },
    (err, user) => {
      if(err) {
        return res.json(500)
      }
      return res.json(user)
    }
  )
});






module.exports = router;
