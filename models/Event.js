const { Schema, model } = require("mongoose");

/**
 *  Schema of Event Model
 */
const EventSchema = Schema({

   title: {
      type: String,
      required: true
   },
   notes: {
      typed: String,
   },
   start: {
      type: Date,
      required: true
   },
   end: {
      type: Date,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
   }

});

EventSchema.method('toJSON', function() {
  const { __v, _id, ...object }  = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('Event', EventSchema);