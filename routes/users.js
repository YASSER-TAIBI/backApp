const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user.model');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    nom: req.body.nom,
    email: req.body.email,
    prenom: req.body.prenom,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});



// Login
router.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: "Email non trouvé"});
    } 

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 semaine (en seconde)
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
          }
        });
      } else {
        return res.json({success: false, msg: "Mauvais mot de passe"});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

//get all users
router.get('/usersall', function(req, res, next){
  
  User.find(function(err, userListResp){
    if(err){
      res.send({status: 500, message: 'Unable to Find users'});
            }
      else{

        const recordCount = userListResp.length;
      res.send({status: 200,recordCount:recordCount , results: userListResp});
          }

  });

});

module.exports = router;