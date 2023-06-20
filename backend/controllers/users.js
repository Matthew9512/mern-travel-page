const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

/**
 * @todo updateLikeMsg
 */

// get user data
const getUser = async (req, res, next) => {
   try {
      const { id } = req.params;

      if (!id) return res.status(404).json({ message: `no data provided` });

      const user = await usersModel.findById({ _id: id });

      if (!user) return res.status(404).json({ message: `user not found` });

      // decoded users info
      const { userID } = req.user;

      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      const { password, updatedAt, __v, ...usersData } = user._doc;

      res.status(200).json(usersData);
   } catch (error) {
      next(error);
   }
};

// refresh json web token
const refreshJwt = (req, res) => {
   const cookies = req.cookies;

   if (!cookies?.jwt) return res.status(401).json({ message: `You are not authorized to access this information` });
   const refreshToken = cookies.jwt;

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (error, decodedInfo) => {
      if (error) {
         console.log(error);
         return res.status(403).json({ message: `You are not authorized to access this information` });
      }
      const user = await usersModel.findOne({ _id: decodedInfo.userID });
      if (!user) return res.status(401).json({ message: 'User not found, refresh' });

      const accessToken = jwt.sign({ email: user.email, userID: user.id }, process.env.ACCESS_TOKEN, {
         expiresIn: '15m',
      });

      res.json({ accessToken });
   });
};

// login
const logIn = async function (req, res, next) {
   try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({ message: `please input correct email and password` });

      const user = await usersModel.findOne({ email });

      if (!user) return res.status(401).json({ message: `wrong email or password` });

      const bcryptPassword = await bcrypt.compare(password, user.password);

      if (!bcryptPassword) return res.status(401).json({ message: `wrong email or password` });

      const accessToken = jwt.sign({ email, userID: user.id }, process.env.ACCESS_TOKEN, { expiresIn: '15m' });

      const refreshToken = jwt.sign({ email, userID: user.id }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

      res.cookie('jwt', refreshToken, {
         httpOnly: true, //accessible only by web server
         secure: true, //https
         sameSite: 'None', //cross-site cookie
         maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });

      res.status(200).json({ accessToken, message: `login successful, welcome back ${user.username}` });
   } catch (error) {
      next(error);
   }
};

// signin
const signIn = async function (req, res, next) {
   try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) return res.status(400).json({ message: `incorrect username or password` });

      const duplicate = await usersModel.findOne({ email });

      if (duplicate) return res.status(409).json({ message: `email is invalid or already taken` });

      const bcryptPassword = await bcrypt.hash(password, 10);

      const newUser = await usersModel.create({
         email,
         username,
         password: bcryptPassword,
      });

      if (!newUser) return res.status(400).json({ message: 'invalid user data received, pls try again' });

      res.status(201).json({ message: `user succesfully created, welcome ${username}` });
   } catch (error) {
      next(error);
   }
};

// update/save type of like
const updateLikesType = async function (req, res, next) {
   try {
      const { id, userLikes } = req.body;
      console.log(req.body);
      if (!id || !userLikes) return res.status(404).json({ message: `No data provided` });

      const respond = await usersModel.findById({ _id: id });

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      //
      const checkIfLikeWasSaved = await respond.userLikes.find((value) => value.postID == userLikes.postID);

      if (!checkIfLikeWasSaved) {
         await usersModel
            .updateOne(
               { _id: id },
               { $addToSet: { userLikes: { postID: userLikes.postID, rateType: userLikes.rateType } } }
            )
            .orFail();
      } else {
         await usersModel.updateOne(
            { _id: id, 'userLikes.postID': userLikes.postID },
            { $set: { 'userLikes.$.rateType': userLikes.rateType } }
         );
      }

      res.status(200).end();
   } catch (error) {
      next(error);
   }
};

module.exports = { logIn, signIn, updateLikesType, getUser, refreshJwt };
