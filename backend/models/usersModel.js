const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
   {
      email: String,
      username: String,
      password: String,
      bookings: [String],
      userVotes: [{ travelID: String }],
      userLikes: [{ postID: String, rateType: String }],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelUser', UsersSchema);
