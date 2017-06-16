const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = new Schema({
  eventName: { type : String, required : true },
  organizer: { type : String, required : true },
  begDate: { type : String, required : true },
  begTime: { type : String, required : true },
  endDate: { type : String, required : true },
  endTime: { type : String, required : true },
  location: { type: String },
  category: { type: String, required: true},
  description: { type: String },
  attendeeIds: { type: Array },
  comments: { type: Array, default: [] },
  imageUrl: { type: String }
});



module.exports = mongoose.model( 'Event', Event );
