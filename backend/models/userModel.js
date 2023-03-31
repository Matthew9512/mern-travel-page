const mongoose = require('mongoose');
const { format } = require('date-fns');
const Schema = mongoose.Schema;

const userSchema = new Schema(
   {
      username: String,
      password: String,
      bookings: {
         type: [String],
         // created: format(new Date(), 'dd/MM/yyyy'),
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelUser', userSchema);
