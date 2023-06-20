require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/connectDB');
const errorHandler = require('./middleware/errorHandler');
const cacheControl = require('./middleware/cacheControl');

app.use(cors(corsOptions));

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

// ==============================================================
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
//    {
//       city: 'maledivy',
//       country: 'azja',
//       price: 5000,
//       category: '',
//       type: 'relax',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eius Lorem ipsum dolor sit amet consectetur..',
//       startDate: '18/04/2023',
//       endDate: '25/04/2023',
//       image: 'https://cuk.pl/_default_upload_bucket/image-thumb__270359__imageThumbnailTop/glowne_90.webp',
//       availablePlaces: 2,
//    },
//    {
//       city: 'madera',
//       country: 'portugalia',
//       price: 3000,
//       category: '',
//       type: 'intensive sightseeing',
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eius.',
//       startDate: '20/03/2023',
//       endDate: '27/03/2023',
//       image: 'https://images.r.pl/zdjecia/lokalizacje/5329/bali_5329_95745_136321_1000x1000.jpg',
//       availablePlaces: 3,
//    },
//    {
//       city: 'maroko',
//       country: 'afryka',
//       price: 4000,
//       category: 'most popular',
//       type: 'intensive sightseeing',
//       description:
//          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eius Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, eius.',
//       startDate: '01/04/2023',
//       endDate: '08/04/2023',
//       image: 'https://images.r.pl/zdjecia/lokalizacje/5329/bali_5329_95745_136321_1000x1000.jpg',
//       availablePlaces: 5,
//    },
// ]);
