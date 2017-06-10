const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const multer = require('multer');
const User = require('../models/user');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImage = multer({ dest: 'uploads/' })

router.post('/:id', uploadImage.single('file'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    console.log(result.url);
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

module.exports = router;
