const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
   {
      id: String,
      username: String,
      post: String,
      likes: {
         type: Number,
         default: 0,
      },
      userLikes: [{ userID: String, rateType: String }],
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelComment', CommentsSchema);
