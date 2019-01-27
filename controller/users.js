/**
 * userController.js
 *
 * @module      :: Controller
 * @description :: defination of users routes action
 * @author      :: Joshim Uddin
 */

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { validateRegisterInput } = require('../validator/validator');

// Load User Model
const User = require('../models/User');


/**
 * @controller Register
 * @desc register a users to the database...
 */
const registerController = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.json(errors)
  }

  let { name, email, password } = req.body;
  // check email exist or not. If not exist then store to the database.
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(409).json({ email: 'Email already exist' });
    } else {
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({
        name, email, avatar, password
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
            .then(user => res.status(201).json(user))
            .catch(err => console.log(err))
        })
      });
    }
  }).catch(err => console.log(err));
}

/**
 * @controller loginController
 * @desc check provided info, If all information is valid then generated a token.
 */
const loginController = () => {
  res.status(200).json({ msg: 'login' });
}


/**
 * @controller getUsersController
 * @desc if req is passed auth. then provide all Users 
 */
const getUsersController = (req, res) => {
  User.find({}).then(users => {
    if (!users) return res.json({ msg: 'Users Database is Empty' });
    else {
      return res.json({});
    }
  }).catch(err => console.log(err));
}

/**
 * @controller getUserController
 * @desc if req is passed auth. then provide all a Single User.
 */
const getUserController = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) res.json({ msg: 'User not found' });
      else {
        res.json(user);
      }
    })
    .catch(err => console.log(err))
}


module.exports = {
  registerController,
  loginController,
  getUsersController,
  getUserController
}