require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/errorHandler');
const cacheControl = require('./middleware/cacheControl');

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cacheControl);

// connect to DB
connectDB();

// routes
app.use('/', require('./routes/travelsRouter'));
app.use('/user', require('./routes/usersRouter'));
app.use('/comments', require('./routes/commentsRouter'));
app.use(errorHandler);

mongoose.connection.once('open', () => {
   console.log(`mongoDB connected`);
   app.listen(PORT, () => console.log(`server started`));
});

// travelDataModel.insertMany([
//    {
//       city: 'bali',
//       country: 'new zeland',
//       price: 2000,
//       category: 'most popular',
//       type: 'relax',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eius elit. Fugiat, eius.',
//       startDate: '12/04/2023',
//       endDate: '17/04/2023',
//       image: 'https://f4fcdn.eu/wp-content/uploads/2018/07/Bali-Cocos.Bounty.jpg',
//       availablePlaces: 4,
//    },
// ]);
