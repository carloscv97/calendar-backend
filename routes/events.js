/**
 *  Events Router
 *  host + /api/events
 */
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { getAllEvents, deleteEvent, updateEvent, addEvent } = require('../controllers/eventsController');
const { verifyFields } = require('../middlewares/verifyFields');
const verifyJWT = require('../middlewares/verifyJWT');
const isDate = require('../helpers/isDate');

/* Midlaware generalizado */
router.use(verifyJWT);

/* Get Events */
router.get('/'  ,getAllEvents);

/* Add a new event */
router.post(
   '/',
   [
      check('title','Title is required').not().isEmpty(),
      check('start','Start Date is required').custom( isDate ),
      check('end','End Date is required').custom( isDate ),
      verifyFields
   ],
   addEvent);

/* Update an event */
router.put('/:id', updateEvent);

/* Delete an event */
router.delete('/:id', deleteEvent);

module.exports = router;