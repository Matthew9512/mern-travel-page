require('dotenv').config();
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = asyncHandler(async function (req, res) {
   const { username, password } = req.body;

   if (!username || !password) return res.status(400).json({ message: `please input correct username and password` });

   const user = await userModel.findOne({ username });

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
   res.status(200).json({ message: `user login successfully`, id: user._id, createdAt: user.createdAt });
});

module.exports = login;
