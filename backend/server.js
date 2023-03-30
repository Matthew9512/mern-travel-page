require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
const PORT = 8000;
const app = express();
const travelDataModel = require('./models/travelDataModel');

// // setting cors options
// const whitelist = ['https://mysite.com', 'http://127.0.0.1:5173', 'http://localhost:8000'];
// const corsOptions = {
//    origin: (origin, callback) => {
//       if (whitelist.indexOf(origin) !== -1) callback(null, true);
//       else callback(new Error('Not allowed by CORS'));
//    },
//    optionsSuccessState: 200,
// };

// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

// routes
app.use('/', require('./routes/travelRouter'));

app.use('/users', require('./routes/userRouter'));

app.use('/search/', require('./routes/postsRouter'));

app.get('*', (req, res) => {
   res.send('erorr');
});

// connect to DB and start server
const connectDB = async function () {
   try {
      await mongoose.connect(`${process.env.MONGODB_URL}`);
      app.listen(PORT, () => console.log(`server started`));
   } catch (error) {
      console.log(error.message);
      // mongoose.connection.close;
      //      SEND STATUS CODE AND MESSAGE
   }
};
connectDB();

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
