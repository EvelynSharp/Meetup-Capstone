const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  if (req.user)
    next();
   else
     return res.json({ })
}

//Helper function to whitelist attributes
const userAttrs = (user) => {
  const { _id, username, role, avatarUrl, profileImage } = user;
  return { _id, username, role, avatarUrl, profileImage };
}

router.post('/signup', (req, res) => {
  let { nickName,
        birthDate,
        phoneNumber,
        address,
        gender, 
        email,
        password,
        avatarUrl } = req.body;
  User.register(new User({username: email,
                          avatarUrl,
                          profileImage:'',
                          nickName,
                          birthDate,
                          phoneNumber,
                          address,
                          gender
                        }), password, (err, user) => {
    if (err)
      return res.status(500).json(err);
    user.save( (err, user) => {
      if (err)
        return res.status(500).json(err);
      return res.json(userAttrs(user));
    });
  });
});

router.post('/signin', (req, res) => {
 let { email, password } = req.body
 User.findOne({ username: req.body.email}, (err, user) => {
   if (user) {
     user.authenticate(req.body.password, (err, user, passwordErr) => {
       if (err){
         return res.json(500, 'User not found');
       }
       if (passwordErr)
         return res.json(500, passwordErr.message)
       req.logIn(user, (err) => {
         return res.json(userAttrs(user));
       })
     });
   } else {
     return res.json(500, 'User not found')
   }
  });
});




router.get('/user', isAuthenticated, (req,res) => {
  return res.json(req.user)
});

router.delete('/sign_out', (req, res) => {
  req.logout();
  res.status(200).json({});
});


module.exports = router;
