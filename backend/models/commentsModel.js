const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = new Schema(
   {
      id: String,
      username: {
         type: String,
         required: true,
      },
      post: {
         type: String,
         required: true,
      },
      likes: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelComment', CommentsSchema);
