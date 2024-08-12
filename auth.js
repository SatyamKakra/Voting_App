const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');



passport.use(new localStrategy(async (aadharCardNumber,password,done) => {
    // authentication logic here
    try{
    //   console.log('Received credential', aadharCardNumber,password);
      const user = await User.findOne({aadharCardNumber: aadharCardNumber});
      if(!user)
        return done(null, false,{message: 'Incorrect aadhar Card Number'});
  
    //   const isPasswordMatch = user.password === password ? true : false;
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null,false, {message: 'Incorrect password'});
      }
  
    }catch(err){
      return done(err);
    }
  }))
  


  module.exports = passport;  //export configured passport