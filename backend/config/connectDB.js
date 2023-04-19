const mongoose = require('mongoose');

// connect to DB and start server
const connectDB = async function () {
   try {
      await mongoose.connect(`${process.env.MONGODB_URL}`);
   } catch (error) {
      console.log(error.message);
      // mongoose.connection.close;
      //      SEND STATUS CODE AND MESSAGE
   }
};

module.exports = connectDB;
