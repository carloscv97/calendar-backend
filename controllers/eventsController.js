const { response } = require('express');
const Event = require('../models/Event');

/**
 *   Get All Events
 */
const getAllEvents = async (req, res = response) => {
   
   try {
      
      const events = await Event.find()
                                 .populate('user','name')
      res.json({
         ok: true,
         events
      })

   } catch (err) {
      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      });
   }


}

/**
 *   Get All Events
 */
const addEvent = async (req, res = response) => {
   
   const event = new Event(req.body);

   try {

      event.user = req.uid;
      await event.save();

      res.status(201).json({
         ok: true,
         event
      })
      
   } catch (err) {
      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      });
   }

}

/**
 *   Get All Events
 */
const updateEvent = async (req, res = response) => {
   

   try {
     
      const eventId = req.params.id;
      const event = await Event.findById(eventId);

      if (!event) {
         res.status(404).json({
            ok: false,
            msg: "Event not found"
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: "You can't update this event"
         });
      }

      /* At this point you can update the event */
      const newEvent = {
         ...req.body,
         user: uid
      }

      const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );
      
      res.json({
         ok: true,
         eventUpdated
      })
      
      
   } catch (err) {
      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      });
   }
}

/**
 *   Get All Events
 */
const deleteEvent = async (req, res = response) => {
   
   try {
      const uid = req.uid;
      const eventId = req.params.id;
      const event = await Event.findById(eventId);

      if (!event) {
         res.status(404).json({
            ok: false,
            msg: "Event not found"
         })
      }

      if (event.user.toString() !== uid) {
         res.status(401).json({
            ok: false,
            msg: "You can't update this event"
         });
      }

      /* At this point you can update the event */
      const newEvent = {
         ...req.body,
         user: uid
      }

      await Event.findByIdAndRemove(eventId);
      
      res.json({
         ok: true,
         msg: 'Event Deleted'
      })
      
      
   } catch (err) {
      console.log(err);
      res.status(500).json({
         ok: false,
         msg: 'Something happened, Please contact support'
      });
   }
}

module.exports = {
   getAllEvents,
   addEvent,
   updateEvent,
   deleteEvent
}

