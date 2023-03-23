// setting cors options
const whitelist = ['https://mysite.com', 'http://127.0.0.1:5173', 'http://localhost:8000'];
const corsOptions = {
   origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
   },
   optionsSuccessState: 200,
};

module.exports = corsOptions;
