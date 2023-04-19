const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { format } = require('date-fns');

const UsersSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      bookings: {
         type: [String],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelUser', UsersSchema);
