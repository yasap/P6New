const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../models/user");
exports.signup = (req, res, next) => {
   console.log(req.body);
        bcrypt.hash(req.body.password, 10).then( 
          (hash) => {
            const newUser = new user({
              email:req.body.email,
              password: hash
            });
           
          newUser.save().then(
              () => {
                res.status(201).json({
                  message: 'User added successfully!'
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
          
        );
        
      };

exports.login = (req, res, next) => {
  console.log(req.body);
  const u = new user({
    email: req.body.email, 
    password: req.body.password
  })
  
    user.findOne({ email: req.body.email }).then(
          (loggedin) => {
            if (!loggedin) {
              return res.status(401).json({
                error:'User not found!'
              });
            }
            bcrypt.compare(u.password, loggedin.password).then(
              (valid) => {
                if (!valid) {
                  return res.status(401).json({
                    error: 'Incorrect password!'
                  });
                }
                const token = jwt.sign(
                    {userId:user._id},
                    'I_LIKE_WEBDEVELOPMET_AND_I_WOULD_LIKE_TO_BECOME_A_DEVELOPER',
                    {expiresIn:'24h'}
                );
                res.status(200).json({
                  userId: user._id,
                  token: token
                });
              }
            ).catch(
              (error) => {
                res.status(500).json({
                  error: error
                });
              }
            );
          }
    ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
};