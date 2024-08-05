const express = require('express');
const router = express.Router();

const User = require('../models/user');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// post route to add a User
router.post('/signup',jwtAuthMiddleware, async (req,res) => {
    try{
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admins only' });
      }
      next();
    const data = req.body //assuming the request body contains the User data
  
    // create new User documnet using the mongoose model
    const newUser = new User(data);
  
    const response = await newUser.save();
    console.log('data saved');
    
    const payload = {
      id: response.id,
    }
    const token = generateToken(payload);
    console.log("Token is :", token);
    
    res.status(200).json({response: response, token: token});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  
  }
  
  })
  

  // login route
  router.post('/login', async(req, res) => {
    try{
    // extract username and password from request body
    const {aadharCardNumber, password} = req.body;

    // find the user by username
    const user = await User.findOne({aadharCardNumber: aadharCardNumber});

    // if user dose not exist or password dose not match, return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});

    }
    // generate token
    const payload = {
      id: user.id,
    }
    const token = generateToken(payload);

    // return token as response
    res.json({token})
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
  });

  // get all user
  router.get('/allVoter', async (req,res) => {
    try{
      const user = await User.find()
      res.status(200).json({user})

    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

  //  profile route
  router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
      const userData = req.user;


      const userId = userData.id;
      const user = await User.findById(userId);

      res.status(200).json({user});
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })

 



//   update 
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
      const userId = req.user.id; // Extract the id from the token
      const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

      // Check if currentPassword and newPassword are present in the request body
      if (!currentPassword || !newPassword) {
          return res.status(400).json({ error: 'Both currentPassword and newPassword are required' });
      }

      // Find the user by userID
      const user = await User.findById(userId);

      // If user does not exist or password does not match, return error
      if (!user || !(await user.comparePassword(currentPassword))) {
          return res.status(401).json({ error: 'Invalid current password' });
      }

      // Update the user's password
      user.password = newPassword;
      await user.save();

      console.log('password updated');
      res.status(200).json({ message: 'Password updated' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



  module.exports = router;