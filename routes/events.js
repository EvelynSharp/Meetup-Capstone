const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/', (req, res) => {
  Event.find( (err, events) => {
    res.json(events);
  });
});

router.post('/', (req, res) => {
  let { eventName, organizer, begDate, begTime, endDate, endTime, location, category, description, attendeeIds, imageUrl } = req.body;
  new Event ({
    eventName,
    organizer,
    begDate,
    begTime,
    endDate,
    endTime,
    location,
    category,
    description,
    attendeeIds,
    imageUrl
  }).save( (err, newEvent) => {
    if(err)
      return res.json();
    return res.json(newEvent);
  });
});

router.put('/:id', (req, res) => {
  let { actionType } = req.body;
  if(!actionType) {
    let { eventName, organizer, begDate, begTime, endDate, endTime, location, category, description, attendeeIds, imageUrl } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { eventName, organizer, begDate, begTime, endDate, endTime, location, category, description, attendeeIds, imageUrl }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if(actionType === 'ATTEND') {
    let { updateContents } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $push: { attendeeIds: updateContents }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if (actionType === 'UNATTEND') {
    let { updateContents } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { attendeeIds: updateContents }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if (actionType === 'ADD_COMMENT') {
    let { updateContents } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: updateContents }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if (actionType === 'REMOVE_COMMENT') {
    let { updateContents } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { comments: updateContents }},
      { new: true },
      (err, updateEvent) => {
        if(err)
          return res.json(err)
        return res.json(updateEvent)
      }
    )
  }
});


router.delete('/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id, (err) => {
    if(err)
      return res.json(err)
    return res.sendStatus(204);
  });
});

module.exports = router;
