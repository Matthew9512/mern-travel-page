const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelDataSchema = new Schema({
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
});

module.exports = mongoose.model('Travel', travelDataSchema);
