const express = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/', (req, res) => {
  Event.find( (err, events) => {
    res.json(events);
  });
});

router.post('/', (req, res) => {
  let { eventName, organizer, date, location, category, description, attendeeIds  } = req.body;
  new Event ({
    eventName,
    organizer,
    date,
    location,
    category,
    description,
    attendeeIds
  }).save( (err, newEvent) => {
    if(err)
      return res.json();
    return res.json(newEvent);
  });
});

router.put('/:id', (req, res) => {
  let { actionType } = req.body;
  if(!actionType) {
    let { eventName, organizer, date, location, category, description, attendeeIds } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { eventName, organizer, date, location, category, description, attendeeIds }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if(actionType === 'ATTEND') {
    let { attendeeId } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $push: { attendeeIds: attendeeId }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
      }
    )
  } else if (actionType === 'UNATTEND') {
    let { filteredAttendees } = req.body;
    Event.findByIdAndUpdate(
      req.params.id,
      { $set: { attendeeIds: filteredAttendees }},
      { new: true },
      (err, updatedEvent) => {
        if(err)
          return res.json(err)
        return res.json(updatedEvent)
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
