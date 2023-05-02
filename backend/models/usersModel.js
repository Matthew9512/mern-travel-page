const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { format } = require('date-fns');

const UsersSchema = new Schema(
   {
      email: String,
      username: String,
      password: String,
      bookings: [String],
      userLikes: [{ postID: String, rateType: String }],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelUser', UsersSchema);
