const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const signIn = async function (req, res) {
   const { username, password } = req.body;

   if (!username || !password) return res.status(400).json({ message: `incorrect username or password` });

   const duplicate = await userModel.findOne({ username });

   if (duplicate) return res.status(409).json({ message: `username: ${username} is already taken please choose different name` });

   const bcryptPassword = await bcrypt.hash(password, 10);

   const newUser = await userModel.create({
      username: username,
      password: bcryptPassword,
   });

   if (newUser) res.status(201).json({ message: `user succesfully created, welcome ${username}` });
   else res.status(400).json({ message: 'invalid user data received, pls try again' });
};

module.exports = signIn;
