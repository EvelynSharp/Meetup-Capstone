const express = require('express');
const router = express.Router();
const User = require('../models/user');

const userAttrs = (user) => {
  const { _id, username, role, avatarUrl, profileImage, nickName, birthDate, phoneNumber, address, gender, userBio } = user;
  return { _id, username, role, avatarUrl, profileImage, nickName, birthDate, phoneNumber, address, gender, userBio };
}

router.put('/:id', (req, res) => {
  let { nickName, birthDate, phoneNumber, username, address, avatarUrl, actionType } = req.body;
  if (actionType === 'BIO') {
    let { userBio } = req.body;
    User.findByIdAndUpdate(
      req.params.id,
      { $set: { userBio } },
      { new: true },
      (err, updatedUser) => {
        if(err)
          return res.json(err)
        return res.json(updatedUser)
      }
    )
  } else {
    User.findByIdAndUpdate(
      req.params.id,
      { $set: { nickName, birthDate, phoneNumber, username, address, avatarUrl } },
      { new: true },
      (err, updatedUser) => {
        if(err)
          return res.json(err)
        return res.json(updatedUser)
      }
    )
  }

})


module.exports = router;
