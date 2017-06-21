const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  User.find( (err, users) => {
    res.json(users);
  });
});


router.put('/remove/:id', (req, res) => {
  let { idToRemove, updatedArr, userType } = req.body;
  let curUserId = req.params.id;
  if ( userType === 'UPDATE_CURUSER') {
    let curUserFriends  = req.body.updatedArr;
    User.findByIdAndUpdate(
      curUserId,
      { $set: { friendList: curUserFriends }},
      { new: true },
      (err, updatedUser) => {
        if(err)
          return res.json(err)
        return res.json(updatedUser)
      }
    )
  } else if ( userType === 'UPDATE_CONNECTION') {
    let removeIdFriends = req.body.updatedArr;
    User.findByIdAndUpdate(
      idToRemove,
      { $set: { friendList: removeIdFriends }},
      { new: true },
      (err, updatedUser) => {
        if(err)
          return res.json(err)
        return res.json(updatedUser)
      }
    )
  }
})


router.put('/:id', (req, res) => {
  let { inviterId, userType, actionType } = req.body;
  let inviteeId = req.params.id;
  if ( actionType === 'SEND_INV') {
    if (userType === 'UPDATE_INVITER') {
      User.findByIdAndUpdate(
        inviterId,
        { $push: { invSent: inviteeId }},
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    } else if ( userType === 'UPDATE_INVITEE' ) {
      User.findByIdAndUpdate(
        inviteeId,
        { $push: { invReceived: inviterId }},
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    }
  } else if ( actionType === 'ACCEPT_INV') {
    if (userType === 'UPDATE_INVITER') {
      let invSent = req.body.updatedArr;
      User.findByIdAndUpdate(
        inviterId,
        {
          $push: { friendList: inviteeId },
          $set: { invSent }
        },
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    } else if ( userType === 'UPDATE_INVITEE' ) {
      let invReceived = req.body.updatedArr;
      User.findByIdAndUpdate(
        inviteeId,
        {
          $push: { friendList: inviterId },
          $set: { invReceived }
        },
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    }
  } else if ( actionType === 'DECLINE_INV') {
    if (userType === 'UPDATE_INVITER') {
      let invSent = req.body.updatedArr;
      User.findByIdAndUpdate(
        inviterId,
        { $set: { invSent } },
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    } else if ( userType === 'UPDATE_INVITEE' ) {
      let invReceived = req.body.updatedArr;
      User.findByIdAndUpdate(
        inviteeId,
        { $set: { invReceived } },
        { new: true },
        (err, updatedUser) => {
          if(err)
            return res.json(err)
          return res.json(updatedUser)
        }
      )
    }
  }
})

module.exports = router;
