const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelDataSchema = new Schema({
  city: String,
  country: String,
  price: Number,
  // price: String,
  description: String,
  type: String,
  category: String,
  startDate: String,
  endDate: String,
  image: String,
  // image: {
  // data: Buffer,
  // contentType: String,
  // },
});

module.exports = mongoose.model('Travel', travelDataSchema);
