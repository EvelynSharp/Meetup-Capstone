const express = require('express');
const router = express.Router();
const Cloudinary = require('cloudinary');

const client = () => {
  return new Cloudinary({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}


module.exports = router;
