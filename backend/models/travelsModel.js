const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TravelsSchema = new Schema({
   city: String,
   country: String,
   price: Number,
   description: String,
   type: String,
   category: String,
   startDate: String,
   endDate: String,
   image: String,
   availablePlaces: Number,
   userVotes: {
      type: Number,
      default: 0,
   },
   travelRate: {
      type: Number,
      default: 0,
   },
});

module.exports = mongoose.model('Travel', TravelsSchema);
