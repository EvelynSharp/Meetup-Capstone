const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  username: { type : String, unique : true, required : true, dropDups: true },
  password: { type : String },
  role: { type: String, default: 'user' },
  avatarUrl: { type: String, required: true },
  profileImage: { type: String },
  nickName: { type: String },
  birthDate: { type: String },
  phoneNumber: { type: String },
  gender: { type: String},
  address: { type: String },
  userBio: { type: String },
  friendList: { type: Array },
  invSent: { type: Array },
  invReceived: { type: Array },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model( 'User', User );
