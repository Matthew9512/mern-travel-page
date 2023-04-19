const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

/**
 * @todo remove format
 */

// login
const logIn = async function (req, res, next) {
   try {
      const { username, password } = req.body;

      if (!username || !password) return res.status(400).json({ message: `please input correct username and password` });

      const user = await usersModel.findOne({ username });

      if (!user) return res.status(401).json({ message: `wrong username or password` });

      const bcryptPassword = await bcrypt.compare(password, user.password);

      if (!bcryptPassword) return res.status(401).json({ message: `incorrect password` });

      // access token
      // const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN);
      // // refresh token
      // const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN);
      // // httpOnly cookie
      // res.cookie('jwt', refreshToken, {
      //    httpOnly: true, //accessible only by web server
      //    //   secure: true, //https
      //    sameSite: 'None', //cross-site cookie
      //    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      // });

      // res.status(200).json({ message: `user login successfully`, accessToken });
      res.status(200).json({
         user: {
            username: user.username,
            id: user._id,
            createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy'),
         },
      });
   } catch (error) {
      next(error);
   }
};

// signin
const signIn = async function (req, res, next) {
   try {
      const { username, password } = req.body;

      if (!username || !password) return res.status(400).json({ message: `incorrect username or password` });

      const duplicate = await usersModel.findOne({ username });

      if (duplicate) return res.status(409).json({ message: `username: ${username} is already taken please choose different name` });

      const bcryptPassword = await bcrypt.hash(password, 10);

      const newUser = await usersModel.create({
         username: username,
         password: bcryptPassword,
      });

      if (!newUser) return res.status(400).json({ message: 'invalid user data received, pls try again' });

      res.status(201).json({ message: `user succesfully created, welcome ${username}` });
   } catch (error) {
      next(error);
   }
};

// get user info
const getUser = async function (req, res, next) {
   try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: `no data provided, pls try again` });

      const usersBookings = await usersModel.findOne({ _id: id });

      if (!usersBookings) return res.status(400).json({ message: `user not found` });

      res.status(200).json({ data: usersBookings.bookings });
   } catch (error) {
      next(error);
   }
};

module.exports = { logIn, signIn, getUser };
