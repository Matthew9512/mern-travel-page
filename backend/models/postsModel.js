const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsModel = new Schema(
   {
      id: String,
      username: String,
      post: String,
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('TravelPost', postsModel);
