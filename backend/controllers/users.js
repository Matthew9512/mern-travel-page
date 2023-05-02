const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');

/**
 * @todo remove format
 * @todo userLikes send after every click?!
 */

// login
const logIn = async function (req, res, next) {
   try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json({ message: `please input correct email and password` });

      const user = await usersModel.findOne({ email });

      if (!user) return res.status(401).json({ message: `wrong email or password` });

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
      // res.status(200).json({ message: `user login successfully`, username: user.username, id: user._id });
      res.status(200).json({
         user: {
            email: user.email,
            username: user.username,
            id: user._id,
            createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy'),
            bookings: user.bookings,
            likes: user.userLikes,
         },
      });
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

      if (!id || !userLikes) return res.status(404).json({ message: `No data provided` });

      // const respond = await usersModel.update(
      //    { _id: id, 'userLikes.postID': userLikes.postID },
      //    { $set: { 'userLikes.$.rateType': userLikes.rateType } }
      //    // false
      //    // true
      // );
      const respond = await usersModel.findById({ _id: id });

      if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

      //
      const checkIfLikeWasSaved = await respond.userLikes.find((value) => value.postID == userLikes.postID);

      if (!checkIfLikeWasSaved) {
         await usersModel
            .updateOne({ _id: id }, { $addToSet: { userLikes: { postID: userLikes.postID, rateType: userLikes.rateType } } })
            .orFail();
      } else {
         await usersModel.updateOne(
            { _id: id, 'userLikes.postID': userLikes.postID },
            { $set: { 'userLikes.$.rateType': userLikes.rateType } }
         );
      }
      // == foe development == //
      const respond2 = await usersModel.findOne({ _id: id });
      // == foe development == //

      res.status(200).json(respond2.userLikes);
      // res.status(200).json({ message: `Thank you for updating your likes`, data: respond2.userLikes });
   } catch (error) {
      next(error);
   }
};

module.exports = { logIn, signIn, updateLikesType };

// // update likes of comment and save data of user that rate comment
// const likesOnComments = async function (req, res, next) {
//    try {
//       const { id, likes, userLikes } = req.body;
//       // !likes
//       if (!id || !userLikes) return res.status(404).json({ message: `No data provided` });

//       const respond = await usersModel.updateMany(
//          { _id: id },
//          { likes, $addToSet: { userLikes: { userID: userLikes.userID, rateType: userLikes.rateType } } }
//       );

//       if (!respond) res.status(400).json({ message: `Error occurred couldn't process request` });

//       res.status(200).json({ message: `Thank you for adding your likes` });
//    } catch (error) {
//       next(error);
//    }
// };
// { userLikes: { postID: userLikes.postID, rateType: userLikes.rateType } }

// // get user info
// const getUser = async function (req, res, next) {
//    try {
//       const { id } = req.params;
//       if (!id) return res.status(400).json({ message: `no data provided, pls try again` });

//       const user = await usersModel.findOne({ _id: id });
//       // const usersBookings = await usersModel.findOne({ _id: id });

//       if (!user) return res.status(400).json({ message: `user not found` });
//       // if (!usersBookings) return res.status(400).json({ message: `user not found` });

//       // res.status(200).json({ data: usersBookings.bookings });
//       res.status(200).json({
//          user: {
//             email: user.email,
//             username: user.username,
//             id: user._id,
//             createdAt: format(new Date(user.createdAt), 'dd/MM/yyyy'),
//             bookings: user.bookings,
//             likes: user.likes,
//          },
//       });
//    } catch (error) {
//       next(error);
//    }
// };

// module.exports = { logIn, signIn, updateLikesType, getUser };
